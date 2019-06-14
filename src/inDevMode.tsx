import { facebookUserSession } from "./facebookUserSession";
import { isLocalhost } from "./isLocalhost";
import { isDeveloper } from "./isDeveloper";

export const inDevMode = isLocalhost() || isDeveloper(facebookUserSession);
