import { useIndexHTMLFile } from "../middleware/useIndexHTMLFile"
import { Router } from "./router"

export const registerWildcardToIndexHTMLRoute:Router = 
    expressApp => 
    expressApp.get(
        "*", 
        (req, res) => useIndexHTMLFile(res)
    )
