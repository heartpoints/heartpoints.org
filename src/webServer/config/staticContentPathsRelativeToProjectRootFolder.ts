import { absolutePathForProjectRootRelativePath } from "../../utils/files/absolutePathForProjectRootRelativePath"
import { staticContentPaths } from "./staticContentPaths"

export const staticContentPathsRelativeToProjectRootFolder = staticContentPaths.map(absolutePathForProjectRootRelativePath)