## PHP 8.2 FPM + Nginx + Supervisord

# Stage 1: build frontend
FROM node:18 AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Stage 2: composer dependencies
FROM composer:2 AS composer_builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --ignore-platform-req=ext-oci8 --no-scripts

# Stage 3: final image
FROM php:8.2-fpm

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    git \
    curl \
    unzip \
    nginx \
    supervisor \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libicu-dev \
    zip; \
    if ! apt-get install -y --no-install-recommends libaio1; then \
    apt-get install -y --no-install-recommends libaio1t64; \
    fi; \
    docker-php-ext-install pdo pdo_mysql zip exif pcntl bcmath intl gd; \
    for libdir in /usr/lib/x86_64-linux-gnu /usr/lib/aarch64-linux-gnu; do \
    if [ -f "$libdir/libaio.so.1t64" ] && [ ! -e "$libdir/libaio.so.1" ]; then \
    ln -s libaio.so.1t64 "$libdir/libaio.so.1"; \
    fi; \
    done; \
    rm -f /etc/nginx/conf.d/default.conf /etc/nginx/sites-enabled/default; \
    rm -rf /var/lib/apt/lists/*

COPY docker/instantclient/ /tmp/instantclient/

RUN set -eux; \
    if ls /tmp/instantclient/*.zip >/dev/null 2>&1; then \
        ic_pattern="*linux.arm64*.zip"; \
        if ! ls /tmp/instantclient/${ic_pattern} >/dev/null 2>&1; then \
            echo "Missing Oracle Instant Client archives matching ${ic_pattern}. Please include ARM archives only." >&2; \
            exit 1; \
        fi; \
        apt-get update && apt-get install -y --no-install-recommends libaio-dev libnsl-dev build-essential pkg-config unzip; \
        for f in /tmp/instantclient/${ic_pattern}; do unzip -qn "$f" -d /opt; done; \
        INSTDIR=$(ls -d /opt/instantclient_* | head -n1); \
        echo "$INSTDIR" > /etc/ld.so.conf.d/oracle-instantclient.conf; ldconfig; \
        printf "instantclient,%s\n" "$INSTDIR" | pecl install oci8-3.0.1; \
        docker-php-ext-enable oci8; \
    else \
        echo 'No Oracle Instant Client zip files found in docker/instantclient/' >&2; \
        exit 1; \
    fi; \
    rm -rf /var/lib/apt/lists/*

COPY --from=composer_builder /app/vendor /var/www/html/vendor

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy application files
WORKDIR /var/www/html
COPY . /var/www/html
RUN rm -f bootstrap/cache/*.php

# Copy built frontend assets
COPY --from=node_builder /app/public /var/www/html/public

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Set permissions
RUN set -eux; \
    mkdir -p storage bootstrap/cache; \
    chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/vendor || true;

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl -f http://localhost/ || exit 1

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
