import path from "path"

const directoryContainingThisSourceFile = __dirname

export const absolutePathForProjectRootRelativePath =
    pathAssumedRelativeToProjectRoot => 
    path.join(
        directoryContainingThisSourceFile,
        "../../..",
        pathAssumedRelativeToProjectRoot
    )