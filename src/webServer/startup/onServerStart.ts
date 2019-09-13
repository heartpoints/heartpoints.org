import { log } from "../../utils/debugging/log"
import { loginUrl } from "../config/loginUrl"
import { baseUrl } from "../config/baseUrl"

export const onServerStart = () => {
    log(`'Express server listening on ${baseUrl}`)
    log(`'Try hidden dev site at ${loginUrl}`)
}
