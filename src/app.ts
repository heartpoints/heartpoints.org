import expressModule from "express";
import http from "http";
import path from "path";

const hostname = "localhost";
const { env } = process;
const { commitSha } = env

const httpPort = env.PORT ? env.PORT : 5001;
const expressApplication = expressModule();

const setUpCoreServer = (expressApplication) => {
    expressApplication.set('port', httpPort);
}

const setUpMiddleWare = (expressApplication) => {
    expressApplication.use((req, response, next) => {
        response.set({ commitSha });	
        next();
    });
    expressApplication.use(expressModule.static(path.join(__dirname, "./public")));
    expressApplication.use(expressModule.static(path.join(__dirname, "../node_modules")));
    expressApplication.use(expressModule.static(path.join(__dirname, "../dist")));
}

const startServer = (expressApplication) => {
    http.createServer(expressApplication).listen(expressApplication.get('port'), () => {
        const baseUrl = `http://${hostname}:${httpPort}`;
        const loginUrl = `${baseUrl}/#login`
        console.log(`'Express server listening on ${baseUrl}`);
        console.log(`'Try hidden facebook login at ${loginUrl}`);
    });
}

setUpCoreServer(expressApplication);
setUpMiddleWare(expressApplication);
startServer(expressApplication);