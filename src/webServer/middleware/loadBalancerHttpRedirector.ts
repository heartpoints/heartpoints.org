import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { ExpressMiddleware } from "./ExpressMiddleware";

export const loadBalancerHttpRedirector:ExpressMiddleware = 
    (req, res, next) => 
    req.headers["x-forwarded-proto"] === "http"
        ? res.redirect(urlFromExpressRequest(req).setProtocol("https").asString)
        : next()

