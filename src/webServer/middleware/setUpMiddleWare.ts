import { commitShaHeaderMiddleware } from "./commitShaHeaderMiddleware"
import { serveStaticContent } from "./serveStaticContent";

export const setUpMiddleWare = (expressApplication) => {
    expressApplication.use(commitShaHeaderMiddleware)
    serveStaticContent(expressApplication)
}
