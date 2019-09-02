import { expressApplication } from "./expressApplication"
import { setUpCoreServer } from "./setUpCoreServer"
import { setUpMiddleWare } from "./setUpMiddleWare"
import { registerHTTPListener } from "./registerHTTPListener"

export const startServer = () => {
    setUpCoreServer(expressApplication)
    setUpMiddleWare(expressApplication)
    registerHTTPListener(expressApplication)
}
