import { Router } from "./Router"
import { Url } from "../../utils/url"

export type RouteProvider = (url:Url, props:any, router:Router) => Router