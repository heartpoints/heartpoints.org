import { indexHTMLFile } from "../config/indexHTMLFile"
import { fileForAbsolutePath } from "../../utils/files/fileForAbsolutePath";

export const useIndexHTMLFile = (_, httpResponse) => fileForAbsolutePath(indexHTMLFile).pipe(httpResponse)
