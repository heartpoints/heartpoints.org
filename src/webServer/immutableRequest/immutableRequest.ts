import { IUrl } from "../../utils/url/IUrl";
import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { Request as ExpressRequest } from "express";
import { maybeHeaders } from "./maybeHeaders";
import { Headers } from "./headers";
import { IMaybe } from "../../utils/maybe/IMaybe";
import { Protocol } from "../../utils/url/Protocol";

export type ImmutableRequest = {
    url:IUrl
    headers:Headers
    loadBalancer:IMaybe<LoadBalancer>
}

type HostName = string

type LoadBalancer = {
    originalProtocol:IMaybe<Protocol>,
    originalHost:IMaybe<HostName>
}

const loadBalancer = (headers:Headers):LoadBalancer => ({
    originalProtocol: headers[loadBalancerProtocolHeaderName].map(h => h === "http" ? "http" : "https"),
    originalHost: headers[loadBalancerHostHeaderName],
})

const loadBalancerHostHeaderName = "x-forwarded-host"
const loadBalancerProtocolHeaderName = "x-forwarded-proto"

export const immutableRequest = (req:ExpressRequest):ImmutableRequest => ({
    get headers() { return maybeHeaders(req.headers) },
    get url() { return urlFromExpressRequest(req) },
    get loadBalancer() { return this.headers[loadBalancerProtocolHeaderName].map(_ => loadBalancer(this.headers)) }
})