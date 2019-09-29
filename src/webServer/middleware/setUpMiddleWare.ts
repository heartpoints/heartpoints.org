import { Application } from "express"
import { middlewares } from "./middlewares"

export const setUpMiddleWare = 
    (expressApp:Application) =>
    middlewares.map(middleware => expressApp.use(middleware))