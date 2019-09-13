import { onServerStart } from "./onServerStart"
import http from "http"
import { httpPort } from "../config/httpPort";

export const registerHTTPListener = 
    expressApplication =>
    http.createServer(expressApplication).listen(
        httpPort, 
        onServerStart
    )