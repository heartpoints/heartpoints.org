import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";

export const middlewares = [
    ...staticContentMiddlewares, 
    commitShaHeaderMiddleware, 
    loadBalancerHttpRedirector
];