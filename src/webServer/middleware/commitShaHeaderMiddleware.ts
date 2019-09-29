import { commitSha } from "../config/commitSha"
import { Middleware } from "./middleware";

export const commitShaHeaderMiddleware:Middleware = (request, response, next) => {
    response.set({ commitSha })
    next()
}
