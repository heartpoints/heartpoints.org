Client Dev Server (via webpack-dev-server)
------------------------------------------

For client development, we use webpack-dev-server, which watches our typescript code, recompiles it on the fly,
and hot reloads the react app in-browser automatically for us, speeding development time.

# Prerequisites

Ensure the [api dev server](./serverDev) is running, since the webpack-dev-server will proxy all non-frontend requests
thereto; if it is not running, you may see one of the [common errors](./commonErrors.md)

To prepare and run the development web server (based on webpack-dev-server), run:

    ./hp clientDev

Then, look at the output for a URL. Click or copy paste that URL into your browser to view the local version of the 
site. As changes are made, the site should be updated automatically after a quick moment.

### Terminate Local Running Version of heartpoints.org

When `./hp clientDev` is running, it may be stopped by pressing `CTRL + C` on the keyboard.