import { restGuruRoutes } from "../rest-guru/restGuruRoutes";
import { registerWildcardToIndexHTMLRoute } from "./registerWildcardToIndexHTMLRoute";
import { Router } from "./router";

export type AllRouters = Array<Router>
export const allRouters:AllRouters = [
    restGuruRoutes, 
    registerWildcardToIndexHTMLRoute
]