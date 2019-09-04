Web Server
----------

The web server is based on express.

# Production

The server runs in production via [the Dockerfile](/Dockerfile), using port 80

# Development

The server can be run during development via `hp serverDev` - this server may be called directly on its port (5001 in dev),
but it is intended to be called indirectly via the webpack-dev-server, see [client dev](./clientDev)
