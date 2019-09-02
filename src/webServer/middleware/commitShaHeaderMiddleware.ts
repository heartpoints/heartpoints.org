import { commitSha } from "../config/commitSha"

export const commitShaHeaderMiddleware = (req, response, next) => {
    response.set({ commitSha })
    next()
}
