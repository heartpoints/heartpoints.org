var expressModule = require('express');
var httpPort = process.env.PORT ? process.env.PORT : 5000;
var http = require('http');
var path = require('path');

var EXPRESS_PORT_CONFIG_KEY = 'port';
var EXPRESS_VIEW_PATH_CONFIG_KEY = 'views';
var VIEWS_PATH = 'views';
var STARTUP_MESSAGE = 'Express server listening on port ';

var expressApplication = expressModule();

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