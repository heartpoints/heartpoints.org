import { onServerStart } from "./onServerStart"
import { httpPort } from "../config/httpPort";

export const registerHTTPListener = 
    httpServer =>
    httpServer.listen(
        httpPort, 
        onServerStart
    )