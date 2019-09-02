import path from "path"

export const relativeToProjectRootFolder = dir => path.join(__dirname, "../..", dir)
