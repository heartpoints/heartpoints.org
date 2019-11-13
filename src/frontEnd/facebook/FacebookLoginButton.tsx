import * as React from "react";
import ReactFacebookLogin from "react-facebook-login";
import { isMobile } from "../site/isMobile";

export const buttonText = () => isMobile() ? "Login" : "Login With Facebook";

export const FacebookLogin = ({onFacebookLoginComplete, onFacebookLoginFailure}) => <ReactFacebookLogin
    appId="1010813445640879"
    autoLoad={false}
    fields="name,email,picture"
    callback={onFacebookLoginComplete} 
    onFailure={onFacebookLoginFailure}
    textButton={buttonText()} />