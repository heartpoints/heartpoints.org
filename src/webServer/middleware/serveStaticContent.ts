import { serveStaticContentFromAbsolutePath } from "./serveStaticContentFromAbsolutePath"
import { staticContentPathsRelativeToProjectRootFolder } from "../config/staticContentPathsRelativeToProjectRootFolder"
import { log } from "../../utils/debugging/log";

export const serveStaticContent =
    expressApplication => 
    log(staticContentPathsRelativeToProjectRootFolder).map(
        serveStaticContentFromAbsolutePath(expressApplication)
    )
