import { Middleware } from "./middleware";
import { allMaybes } from "../../utils/maybe/AllMaybes";
import { notWWWWHost } from "./notWWWWHost";
import { safeWWWUrl } from "./safeWWWUrl";

export const loadBalancerHttpRedirector:Middleware = 
    (req, res, next) => 
    req.loadBalancer
        .flatMap(allMaybes)
        .if(({originalProtocol, originalHost}) => originalProtocol == "http" || notWWWWHost(originalHost))
        .map(({originalHost}) => res.redirect(safeWWWUrl(originalHost, req.url)))
        .valueOr(next)