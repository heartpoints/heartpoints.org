import Cookies from "js-cookie";
import { facebookUserSessionCookieKey } from "./facebookUserSessionCookieKey";
import { inDevMode } from "../developers/inDevMode";
import { navTo } from '../nav/navTo';

export const onFacebookLoginComplete = (state, facebookUserSession) => {
    Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
    const stateAfterSuccessfulLogin = {
            ...state,
            inDevMode: inDevMode(),
            facebookUserSession,
            shouldShowCelebration: true 
    }
    return navTo(stateAfterSuccessfulLogin, '/');
};
