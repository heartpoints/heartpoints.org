import { commitSha } from "../config/commitSha"
import { ExpressMiddleware } from "./ExpressMiddleware";

export const commitShaHeaderMiddleware:ExpressMiddleware = (request, response, next) => {
    response.set({ commitSha })
    next()
}
