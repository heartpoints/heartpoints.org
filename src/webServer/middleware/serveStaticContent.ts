import { serveStaticContentFromAbsolutePath } from "./serveStaticContentFromAbsolutePath"
import { staticContentPathsRelativeToProjectRootFolder } from "../config/staticContentPathsRelativeToProjectRootFolder"
import { Application } from "express";

export const serveStaticContent =
    (expressApplication:Application) => 
    staticContentPathsRelativeToProjectRootFolder.map(
        serveStaticContentFromAbsolutePath(expressApplication)
    )
