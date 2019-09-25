import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";
import { requestLogMiddleware } from "./requestLogMiddleware";
import { immutableRequest } from "../immutableRequest/immutableRequest";

export const middlewares = [
    requestLogMiddleware,
    ...staticContentMiddlewares, 
    commitShaHeaderMiddleware, 
    (req,res,next) => loadBalancerHttpRedirector(immutableRequest(req), res, next),
];