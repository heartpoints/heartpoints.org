import { env } from "../../utils/env"
import { defaultPort } from "./defaultPort"

export const httpPort = env.PORT || defaultPort
