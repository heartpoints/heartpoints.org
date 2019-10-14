import { deleteSessionCookie } from "./deleteSessionCookie";
import { inDevMode } from "../developers/inDevMode";
import { navTo } from "../nav/navTo";

export const onLogoutRequested = (state) => {
    const { facebookUserSession, ...remainingState } = state;
    deleteSessionCookie();
    const stateAfterLogout = { ...remainingState, inDevMode: inDevMode() };
    return navTo(stateAfterLogout, '/');
};
