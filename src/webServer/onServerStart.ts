import { log } from "./log"
import { loginUrl } from "./loginUrl"
import { baseUrl } from "./baseUrl"

export const onServerStart = () => {
    log(`'Express server listening on ${baseUrl}`)
    log(`'Try hidden dev site at ${loginUrl}`)
}
