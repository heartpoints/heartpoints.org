import { setUpCoreServer } from "./setUpCoreServer"
import { setUpMiddleWare } from "../middleware/setUpMiddleWare"
import { registerHTTPListener } from "./registerHTTPListener"
import { registerRoutes } from "../routes/registerRoutes"

export const setupSteps = [setUpCoreServer, registerRoutes, setUpMiddleWare, registerHTTPListener]
