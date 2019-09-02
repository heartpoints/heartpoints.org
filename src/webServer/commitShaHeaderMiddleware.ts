import { commitSha } from "./commitSha"

export const commitShaHeaderMiddleware = (req, response, next) => {
    response.set({ commitSha })
    next()
}
