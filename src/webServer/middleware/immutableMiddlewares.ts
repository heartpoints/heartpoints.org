import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";
import { requestLogMiddleware } from "./requestLogMiddleware";

export const immutableMiddlewares = [requestLogMiddleware, commitShaHeaderMiddleware, loadBalancerHttpRedirector];
