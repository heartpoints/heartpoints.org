import { Router } from "./Router"
import { IUrl } from "../../utils/url/IUrl";

export type RouteProvider = (url:IUrl, props:any, router:Router) => Router