import { IUrl } from "../../utils/url/IUrl";
import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { Request as ExpressRequest } from "express";
import { maybeHeaders } from "./maybeHeaders";
import { Headers } from "./headers";
// import { IMaybe } from "../../utils/maybe/IMaybe";
import { Protocol } from "../../utils/url/Protocol";
// import { maybe } from "../../utils/maybe/maybe";

export type Request = {
    url:IUrl
    headers:Headers
    // loadBalancer:IMaybe<LoadBalancer>
}

type HostName = string

type LoadBalancer {
    originalProtocol:Protocol,
    originalHost:HostName
}

export const request = (req:ExpressRequest):Request => ({
    get headers() { return maybeHeaders(req.headers) },
    get url() { return urlFromExpressRequest(req) }
})