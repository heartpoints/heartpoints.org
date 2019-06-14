import Cookies from "js-cookie";
import { facebookUserSessionCookieKey } from "./facebookUserSessionCookieKey";
export const deleteSessionCookie = () => Cookies.remove(facebookUserSessionCookieKey);
