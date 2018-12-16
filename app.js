const expressModule = require('express');
const http = require('http');
const path = require('path');

const EXPRESS_PORT_CONFIG_KEY = 'port';
const EXPRESS_VIEW_PATH_CONFIG_KEY = 'views';
const VIEWS_PATH = 'views';
const STARTUP_MESSAGE = 'Express server listening on http://localhost:';
const { env } = process;
const sha1 = env.commitSha || 'unknown sha';

const httpPort = env.PORT ? env.PORT : 5001;
const expressApplication = expressModule();

function setUpCoreServer(expressApplication) {
    expressApplication.set(EXPRESS_PORT_CONFIG_KEY, httpPort);
    expressApplication.set(EXPRESS_VIEW_PATH_CONFIG_KEY, path.join(__dirname, VIEWS_PATH));
}

function setUpMiddleWare(expressApplication) {
    expressApplication.use(expressModule.favicon());
    expressApplication.use(expressModule.compress());
    expressApplication.use(expressModule.logger('dev'));
    expressApplication.use(expressModule.urlencoded());
    expressApplication.use(expressModule.methodOverride());
    expressApplication.use((request, response, next) => {
        console.log('adding x-comm');
        response.set('X-commit-sha', sha1);
        next();
    });
    expressApplication.use(expressApplication.router);
    expressApplication.use(expressModule.static(process.cwd() + '/public'));
}

function startServer(expressApplication) {
    http.createServer(expressApplication).listen(expressApplication.get(EXPRESS_PORT_CONFIG_KEY), function(){
        console.log(STARTUP_MESSAGE + httpPort);
    });
}

setUpCoreServer(expressApplication);
setUpMiddleWare(expressApplication);
startServer(expressApplication);