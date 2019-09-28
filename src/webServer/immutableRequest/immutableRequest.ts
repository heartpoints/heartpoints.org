import { IUrl } from "../../utils/url/IUrl";
import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { Request as ExpressRequest } from "express";
import { maybeHeaders } from "./maybeHeaders";
import { Headers } from "./headers";
import { IMaybe } from "../../utils/maybe/IMaybe";
import { loadBalancer, LoadBalancer } from "./loadBalancer";
import { loadBalancerProtocolHeaderName } from "./loadBalancerProtocolHeaderName";

export type ImmutableRequest = {
    url:IUrl
    headers:Headers
    loadBalancer:IMaybe<LoadBalancer>
}

export const immutableRequest = (req:ExpressRequest):ImmutableRequest => ({
    get headers() { return maybeHeaders(req.headers) },
    get url() { return urlFromExpressRequest(req) },
    get loadBalancer() { return this.headers[loadBalancerProtocolHeaderName].map(_ => loadBalancer(this.headers)) }
})