import { facebookUserSessionString } from "./facebookUserSessionString";

export const facebookUserSession = () => {
    const session = facebookUserSessionString()
    return session && JSON.parse(session);
} 