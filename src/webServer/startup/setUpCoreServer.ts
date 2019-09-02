import { httpPort } from "../config/httpPort"

export const setUpCoreServer = (expressApplication) => {
    expressApplication.set('port', httpPort)
}
