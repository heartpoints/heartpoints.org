import fs from "fs"
import { relativeToProjectRootFolder } from "./relDir"
import { indexHTMLFile } from "./indexHTMLFile"

export const useIndexHTMLFile = (_, res) => fs.createReadStream(relativeToProjectRootFolder(indexHTMLFile)).pipe(res)
