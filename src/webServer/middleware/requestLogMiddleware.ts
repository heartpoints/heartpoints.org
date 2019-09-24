import { urlFromExpressRequest } from "../../utils/url/urlFromExpressRequest";
import { ExpressMiddleware } from "./ExpressMiddleware";
import { logJson } from "../../utils/debugging/logJson";
import { uuid } from "../../utils/strings/uuid";

export const requestLogMiddleware:ExpressMiddleware = 
    async (req, res, next) => {
        const { headers, method } = req
        const url = urlFromExpressRequest(req).asString
        const startTime = Date.now()
        const requestGuid = uuid()
        logJson({startTime, requestGuid, url, method, headers})
        await next()
        const { statusCode } = res
        const endTime = Date.now()
        logJson({endTime, requestGuid, url, method, statusCode})
    }