import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
// import { loadBalancerHttpRedirector } from "./loadBalancerHttpRedirector";
import { requestLogMiddleware } from "./requestLogMiddleware";

//todo: fix loadBalancerHttpRedirector and re-add
// export const immutableMiddlewares = [requestLogMiddleware, commitShaHeaderMiddleware, loadBalancerHttpRedirector];
export const immutableMiddlewares = [requestLogMiddleware, commitShaHeaderMiddleware];
