import { logJson } from "../../utils/debugging/logJson";
import { uuid } from "../../utils/strings/uuid";
import { Middleware } from "./middleware";

export const requestLogMiddleware:Middleware = 
    async (req, res, next) => {
        const { headers, method } = req
        const url = req.url.asString
        const startTime = Date.now()
        const requestGuid = uuid()
        console.log(headers);
        console.log(headers.asJSON);
        logJson({startTime, requestGuid, url, method, headers: headers.asJSON})
        await next()
        const { statusCode } = res
        const endTime = Date.now()
        logJson({endTime, requestGuid, url, method, statusCode})
    }