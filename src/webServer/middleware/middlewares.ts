import { staticContentMiddlewares } from "./staticContentMiddlewares";
import { expressMiddlewareFromImmutableMiddleware } from "./expressMiddlewareFromImmutableMiddleware";
import { immutableMiddlewares } from "./immutableMiddlewares";

export const middlewares = [
    ...immutableMiddlewares.map(expressMiddlewareFromImmutableMiddleware),
    ...staticContentMiddlewares, 
];
