import { absolutePathForProjectRootRelativePath } from "../../utils/files/absolutePathForProjectRootRelativePath"
import { staticContentRelativePaths } from "./staticContentRelativePaths"

export const staticContentAbsolutePaths = staticContentRelativePaths.map(absolutePathForProjectRootRelativePath)