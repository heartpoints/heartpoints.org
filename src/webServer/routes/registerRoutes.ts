import { allRouters } from "./allRouters";
import { compose } from "../../utils/composition/compose";

export const registerRoutes = compose(...allRouters)
