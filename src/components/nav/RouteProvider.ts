import { Router } from "./Router"
import { Url } from "../../utils/Url"

export type RouteProvider = (url:Url, props:any, router:Router) => Router