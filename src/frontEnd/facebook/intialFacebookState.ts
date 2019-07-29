import { facebookUserSession } from "./facebookUserSession";

export const initialFacebookState = () => ({
    facebookUserSession: facebookUserSession(),
})