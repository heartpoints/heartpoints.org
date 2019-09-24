import { staticContentPathsRelativeToProjectRootFolder } from "../config/staticContentPathsRelativeToProjectRootFolder";
import express from "express";
export const staticContentMiddlewares = staticContentPathsRelativeToProjectRootFolder.map(absPath => express.static(absPath));
