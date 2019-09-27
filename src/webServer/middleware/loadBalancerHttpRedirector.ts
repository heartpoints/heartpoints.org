import { Middleware } from "./middleware";
import { maybe } from "../../utils/maybe/maybe";
import { AllMaybes } from "./AllMaybes";

export const loadBalancerHttpRedirector:Middleware = 
    (req, res, next) => 
    req.loadBalancer.map(
        lb => lb.originalProtocol.if(p => p == "http").map(
            _ => lb.originalHost.map(
                host => res.redirect(req.url.toHttps.setHost(host).asString)
            )
        )
    ).valueOr(next)