import { restGuruGet } from "./rootResource/restGuruGet";
import { responseText } from "./rootResource/responseText";
import { Router } from "../routes/router";

export const restGuruRoutes:Router =
    (expressApp) => {
        expressApp.options("/rest-guru", (req, res, next) => res.send(responseText(req)))
        expressApp.get("/rest-guru", restGuruGet)
    }