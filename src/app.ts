import express from "express";
import path from "path";
import http from "http";


export class heartPointsWebserver {

    constructor(private expressApp:any){}

    expressPortConfigKey():string {
        return `port`;
    }

    setUpCoreServer( port: number ) {
        this.expressApp.set(this.expressPortConfigKey, port);
    }

    setUpMiddleWare() {
        this.expressApp.use(express.static(path.join(__dirname, "./public")));
        this.expressApp.use(express.static(path.join(__dirname, "../node_modules")));
        this.expressApp.use(express.static(path.join(__dirname, "../dist")));
    }

    startServer(httpPort:number) {
        this.setUpCoreServer(httpPort);
        this.setUpMiddleWare();
        const startupMessage = 'Express server listening on http://localhost:';
        http.createServer(this.expressApp).listen(this.expressApp.get(this.expressPortConfigKey), function(){
            console.log(startupMessage + httpPort);
        });
    }
}

const app = express()
const HPServer = new heartPointsWebserver(app);
HPServer.startServer(5001);