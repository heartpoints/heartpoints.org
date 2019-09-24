import { staticContentAbsolutePaths } from "../config/staticContentAbsolutePaths";
import express from "express";
export const staticContentMiddlewares = staticContentAbsolutePaths.map(absPath => express.static(absPath));
