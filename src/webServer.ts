import expressModule from "express";
import http from "http";
import path from "path";
import fs from "fs";

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
    const relDir = dir => path.join(__dirname, dir);
    const useStaticRelDir = dir => expressApplication.use(expressModule.static(relDir(dir)));
    const publicFolder = "./public";
    const indexHTMLFile = `${publicFolder}/index.html`;
    [publicFolder, "../node_modules", "../dist"].map(useStaticRelDir);
    expressApplication.get("*", (_, res) => {
        fs.createReadStream(relDir(indexHTMLFile)).pipe(res);
    });
}

const startServer = (expressApplication) => {
    http.createServer(expressApplication).listen(expressApplication.get('port'), () => {
        const baseUrl = `http://${hostname}:${httpPort}`;
        const loginUrl = `${baseUrl}/dev`
        console.log(`'Express server listening on ${baseUrl}`);
        console.log(`'Try hidden dev site at ${loginUrl}`);
    });
}

setUpCoreServer(expressApplication);
setUpMiddleWare(expressApplication);
startServer(expressApplication);