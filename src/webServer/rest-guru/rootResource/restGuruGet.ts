import { maybe } from "../../../utils/maybe/maybe"
import { ExpressMiddleware } from "../../middleware/ExpressMiddleware"
import { restGuruGetRoutesForHeader } from "./restGuruGetRoutesForHeader"

export const restGuruGet: ExpressMiddleware = 
    (req, res) => 
    maybe(req.headers.accept).map(restGuruGetRoutesForHeader(res))
