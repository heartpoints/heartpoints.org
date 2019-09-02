import { serveStaticContentFromAbsolutePath } from "./serveStaticContentFromAbsolutePath"
import { staticContentPathsRelativeToProjectRootFolder } from "./staticContentPathsRelativeToProjectRootFolder"
import { log } from "./log";

export const serveStaticContent =
    expressApplication => 
    log(staticContentPathsRelativeToProjectRootFolder).map(
        serveStaticContentFromAbsolutePath(expressApplication)
    )
