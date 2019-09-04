import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware"
import { useIndexHTMLFile } from "./useIndexHTMLFile"
import { serveStaticContent } from "./serveStaticContent";

export const setUpMiddleWare = (expressApplication) => {
    expressApplication.use(commitShaHeaderMiddleware)
    serveStaticContent(expressApplication)
    expressApplication.get("*", (req, res) => useIndexHTMLFile(res))
}
