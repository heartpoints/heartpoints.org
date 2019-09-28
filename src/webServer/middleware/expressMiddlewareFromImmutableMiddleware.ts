import { immutableRequest } from "../immutableRequest/immutableRequest";
import { ExpressMiddleware } from "./ExpressMiddleware";
import { Middleware } from "./middleware";

export const expressMiddlewareFromImmutableMiddleware =
    (immutableMiddleware: Middleware): ExpressMiddleware =>
    (req, res, next) => 
    immutableMiddleware(immutableRequest(req), res, next);
