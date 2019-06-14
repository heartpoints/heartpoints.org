import { isLocalhost } from "./isLocalhost";
import { deleteSessionCookie } from "./deleteSessionCookie";
export const onLogoutRequested = (state) => {
    const { facebookUserSession, ...remainingState } = state;
    deleteSessionCookie();
    return { ...remainingState, inDevMode: isLocalhost() };
};
