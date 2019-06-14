import Cookies from "js-cookie";
import { facebookUserSessionCookieKey } from "./facebookUserSessionCookieKey";
export const facebookUserSessionString = Cookies.get(facebookUserSessionCookieKey);
