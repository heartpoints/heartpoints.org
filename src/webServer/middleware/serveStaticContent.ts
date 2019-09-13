import { serveStaticContentFromAbsolutePath } from "./serveStaticContentFromAbsolutePath"
import { staticContentPathsRelativeToProjectRootFolder } from "../config/staticContentPathsRelativeToProjectRootFolder"
import { log } from "../../utils/debugging/log";
import { Application } from "express";

export const serveStaticContent =
    (expressApplication:Application) => 
    log(staticContentPathsRelativeToProjectRootFolder).map(
        serveStaticContentFromAbsolutePath(expressApplication)
    )
