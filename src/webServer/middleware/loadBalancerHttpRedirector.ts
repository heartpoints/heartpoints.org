import { Middleware } from "./middleware";
import { allMaybes } from "../../utils/maybe/AllMaybes";

export const loadBalancerHttpRedirector:Middleware = 
    (req, res, next) => 
    req.loadBalancer
        .flatMap(allMaybes)
        .if(({originalProtocol}) => originalProtocol == "http")
        .map(l => res.redirect(req.url.toHttps.setHost(l.originalHost).asString))
        .valueOr(next)