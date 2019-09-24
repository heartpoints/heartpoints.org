import { Url } from "./Url";
import { urlStringFromExpressRequest } from "./urlStringFromExpressRequest";
import { Request } from "express";

export const urlFromExpressRequest = (req:Request) => Url(urlStringFromExpressRequest(req))