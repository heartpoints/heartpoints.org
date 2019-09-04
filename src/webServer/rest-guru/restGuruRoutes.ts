import { Application } from "express";
import { restGuruGet } from "./restGuruGet";

export const restGuruRoutes =
    (expressApp:Application) => {
        expressApp.options("/rest-guru", (req, res, next) => res.send("rest-guru options!"))
        expressApp.get("/rest-guru", restGuruGet)
    }