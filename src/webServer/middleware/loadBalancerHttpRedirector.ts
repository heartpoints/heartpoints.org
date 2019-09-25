import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { ExpressMiddleware } from "./ExpressMiddleware";
import { Request } from "express";

//todo: use immutable request.headers Maybes to sort this out
//todo: consider having req.loadbalancer:IMaybe<{forwardedProto, forwardedHost, isLoadBalanced)}>
const loadBalancerProtocol = (req:Request) => req.headers["x-forwarded-proto"]
// const loadBalancerHost = (req:Request) => req.headers["x-forwarded-host"] || req.host
const isLoadBalancerInsecure = (req:Request) => loadBalancerProtocol(req) === "http"

//todo: cnsume new Headers and Request immutable types instead of raw express types

export const loadBalancerHttpRedirector:ExpressMiddleware = 
    (req, res, next) => 
    isLoadBalancerInsecure(req)
        ? res.redirect(urlFromExpressRequest(req).toHttps.asString)
        // ? res.redirect(urlFromExpressRequest(req).toHttps.setHost(loadBalancerHost(req)).asString)
        : next()