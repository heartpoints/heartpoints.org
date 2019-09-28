import { urlStringFromExpressRequest } from "./urlStringFromExpressRequest";
import { Request } from "express";
import { urlFromString } from "./urlFromString";

export const urlFromExpressRequest = 
    (req:Request) => 
    urlFromString(urlStringFromExpressRequest(req))