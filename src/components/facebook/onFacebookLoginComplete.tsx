import Cookies from "js-cookie";
import { facebookUserSessionCookieKey } from "./facebookUserSessionCookieKey";
import { inDevMode } from "../developers/inDevMode";

export const onFacebookLoginComplete = (state, facebookUserSession) => {
    Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
    return { 
        ...state,
        inDevMode: inDevMode(),
        facebookUserSession,
        shouldShowCelebration: true 
    };
};
