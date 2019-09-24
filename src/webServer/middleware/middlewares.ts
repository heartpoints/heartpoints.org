import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { plainHttpRedirector } from "./plainHttpRedirector";
import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { forceSSL } from "../config/forceSSL";
import { possibleArrayElement } from "./possibleArrayElement";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";

export const middlewares = [
    ...staticContentMiddlewares, 
    commitShaHeaderMiddleware, 
    ...possibleArrayElement(forceSSL, plainHttpRedirector),
    loadBalancerHttpRedirector
];