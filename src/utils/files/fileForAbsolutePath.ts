import fs from "fs"
import { absolutePathForProjectRootRelativePath } from "./absolutePathForProjectRootRelativePath"

export const fileForAbsolutePath = path => fs.createReadStream(absolutePathForProjectRootRelativePath(path))
