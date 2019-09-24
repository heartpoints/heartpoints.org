import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";
import { requestLogMiddleware } from "./requestLogMiddleware";

export const middlewares = [
    requestLogMiddleware,
    ...staticContentMiddlewares, 
    commitShaHeaderMiddleware, 
    loadBalancerHttpRedirector,
];