import { maybe } from "../../utils/maybe/maybe"
import { ExpressMiddleware } from "../middleware/ExpressMiddleware"
import { restGuruGetRoutesForHeader } from "./restGuruGetRoutesForHeader"
import { log } from "../../utils/debugging/log";

export const restGuruGet: ExpressMiddleware = 
    (req, res, next) => 
    maybe(log(req.headers.accept)).map(restGuruGetRoutesForHeader(res))
