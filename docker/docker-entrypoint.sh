#!/usr/bin/env bash
set -euo pipefail

echo "[entrypoint] setting permissions"
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/vendor || true

if [ -n "${APP_KEY:-}" ]; then
  echo "[entrypoint] APP_KEY found"
else
  echo "[entrypoint] APP_KEY not set; skipping artisan commands"
fi

if [ "${MIGRATE:-false}" = "true" ]; then
  echo "[entrypoint] running migrations"
  php artisan migrate --force || true
fi

exec "$@"
