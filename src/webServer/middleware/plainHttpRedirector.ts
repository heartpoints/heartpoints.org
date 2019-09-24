import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { ExpressMiddleware } from "./ExpressMiddleware";

export const plainHttpRedirector:ExpressMiddleware = 
    (req, res, next) => {
        const url = urlFromExpressRequest(req)
        return url.protocol == "http"
            ? res.redirect(url.setProtocol("https").asString)
            : next()
    }