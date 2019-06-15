import { deleteSessionCookie } from "./deleteSessionCookie";
import { inDevMode } from "./inDevMode";

export const onLogoutRequested = (state) => {
    const { facebookUserSession, ...remainingState } = state;
    deleteSessionCookie();
    return { ...remainingState, inDevMode: inDevMode() };
};
