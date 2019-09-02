import http from "http"
import { onServerStart } from "./onServerStart"

export const registerHTTPListener = (expressApplication) => {
    http.createServer(expressApplication).listen(expressApplication.get('port'), onServerStart)
}
