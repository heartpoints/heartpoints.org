import * as React from "react";
import { FacebookLogin } from "./FacebookLoginButton";
import { FacebookLoggedInButton } from "./FacebookLoggedInButton";

export const FacebookLoginLogout = (props) => {
    const {facebookUserSession, onFacebookLoginComplete, onFacebookLoginFailure, onLogoutRequested} = props;
    return facebookUserSession
        ? <FacebookLoggedInButton {...props} />
        : <FacebookLogin {...{onFacebookLoginComplete, onFacebookLoginFailure}} /> 
}