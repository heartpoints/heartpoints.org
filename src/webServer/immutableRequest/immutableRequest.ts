import { IUrl } from "../../utils/url/IUrl";
import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { Request as ExpressRequest } from "express";
import { Headers, headers } from "./headers";
import { IMaybe } from "../../utils/maybe/IMaybe";
import { loadBalancer, LoadBalancer } from "./loadBalancer";
import { loadBalancerProtocolHeaderName } from "./loadBalancerProtocolHeaderName";
import { HttpMethod } from "../../restguru/HttpMethod";

export type ImmutableRequest = {
    url:IUrl
    headers:Headers
    loadBalancer:IMaybe<LoadBalancer>
    method:HttpMethod
}

export const immutableRequest = (req:ExpressRequest):ImmutableRequest => ({
    get headers() { return headers(req.headers) },
    get url() { return urlFromExpressRequest(req) },
    get loadBalancer() { return this.headers[loadBalancerProtocolHeaderName].map(_ => loadBalancer(this.headers)) },
    get method() { return req.method.toUpperCase() as HttpMethod }
})