import { onServerStart } from "./onServerStart"
import { serverPort } from "./serverPort";
import { generalHttpServer } from "./generalHttpServer";

export const registerHTTPListener = 
    expressApplication =>
    generalHttpServer(expressApplication).listen(
        serverPort(expressApplication), 
        onServerStart
    )