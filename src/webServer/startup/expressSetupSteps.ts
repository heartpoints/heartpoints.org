import { setUpCoreServer } from "./setUpCoreServer"
import { setUpMiddleWare } from "../middleware/setUpMiddleWare"
import { registerRoutes } from "../routes/registerRoutes"

export const expressSetupSteps = [setUpCoreServer, registerRoutes, setUpMiddleWare]
