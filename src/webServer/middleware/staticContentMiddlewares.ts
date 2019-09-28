import { staticContentAbsolutePaths } from "../config/staticContentAbsolutePaths";
import express from "express";
import { ExpressMiddleware } from "./ExpressMiddleware";

export const staticContentMiddlewares:ExpressMiddleware[] = 
    staticContentAbsolutePaths.map(absPath => express.static(absPath))
