import { relativeToProjectRootFolder } from "./relDir"
import { staticPaths } from "./staticPaths"

export const staticContentPathsRelativeToProjectRootFolder = staticPaths.map(relativeToProjectRootFolder)