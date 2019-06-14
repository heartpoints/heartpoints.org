import Cookies from "js-cookie";
import { isDeveloper } from "../isDeveloper";
import { facebookUserSessionCookieKey } from "../facebookUserSessionCookieKey";

export const onFacebookLoginComplete = (state, facebookUserSession) => {
    Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
    const inDevMode = isDeveloper(facebookUserSession);
    return { ...state, inDevMode, facebookUserSession, shouldShowCelebration: true };
};
