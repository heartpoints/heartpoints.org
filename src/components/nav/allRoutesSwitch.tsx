import { Switch } from "../../utils/Switch";
import { Routes } from "./Routes";
import { Router } from "./Router";

export const allRoutesSwitch = 
    (url, props) =>
    Routes().reduce(
        (router, currentRouteSet) => currentRouteSet(url, props, router), 
        Switch.when(url.path) as Router
    )
