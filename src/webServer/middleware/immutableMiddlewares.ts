import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware";
import { requestLogMiddleware } from "./requestLogMiddleware";

export const immutableMiddlewares = [requestLogMiddleware, commitShaHeaderMiddleware];
