import { indexHTMLFile } from "../config/indexHTMLFile"
import { useStaticFile } from "./useStaticFile";
import { absolutePathForProjectRootRelativePath } from "../../utils/files/absolutePathForProjectRootRelativePath";

export const useIndexHTMLFile = useStaticFile(absolutePathForProjectRootRelativePath(indexHTMLFile))
