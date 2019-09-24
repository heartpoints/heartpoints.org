import { env } from "../../utils/env"
import { possibleStringToBoolean } from "../../utils/strings/possibleStringToBoolean";

export const forceSSL = possibleStringToBoolean(env.forceSSL, false)