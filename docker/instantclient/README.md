Place the Oracle Instant Client ZIPs required for your target architectures in this directory before building the Docker image.

Required files (download from https://www.oracle.com/database/technologies/):

- `instantclient-basic-linux.x64-19.29.0.0.0dbru.zip`
- `instantclient-sdk-linux.x64-19.29.0.0.0dbru.zip`
- `instantclient-basic-linux.arm64-19.29.0.0.0dbru.zip`
- `instantclient-sdk-linux.arm64-19.29.0.0.0dbru.zip`

The Dockerfile auto-detects the build architecture (`TARGETARCH`) and only unzips the archives matching that platform. If the required archives for the current platform are missing, the Docker build will fail (so make sure to include both sets before multi-arch builds).
