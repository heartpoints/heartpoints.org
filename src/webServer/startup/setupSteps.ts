import { setUpCoreServer } from "./setUpCoreServer";
import { setUpMiddleWare } from "../middleware/setUpMiddleWare";
import { registerHTTPListener } from "./registerHTTPListener";
export const setupSteps = [setUpCoreServer, setUpMiddleWare, registerHTTPListener];
