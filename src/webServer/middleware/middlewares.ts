import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";
import { requestLogMiddleware } from "./requestLogMiddleware";
import { immutableRequest } from "../immutableRequest/immutableRequest";
import { log } from "../../utils/debugging/log";

export const middlewares = [
    requestLogMiddleware,
    commitShaHeaderMiddleware, 
    ...staticContentMiddlewares, 
    (req,res,next) => loadBalancerHttpRedirector(immutableRequest(req), res, next),
];