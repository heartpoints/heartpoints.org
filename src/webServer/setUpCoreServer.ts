import { httpPort } from "./httpPort"

export const setUpCoreServer = (expressApplication) => {
    expressApplication.set('port', httpPort)
}
