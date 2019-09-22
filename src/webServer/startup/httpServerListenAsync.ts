import { httpPort } from "../config/httpPort";
import { Server } from "http";

export const httpServerListenAsync =
    (httpServer:Server) => 
    new Promise(
        resolve =>
        httpServer.listen(
            httpPort,
            resolve
        )
    )