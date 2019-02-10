import * as React from "react";
import ReactFacebookLogin from "react-facebook-login";

export const FacebookLogin = ({onFacebookLoginComplete}) => <ReactFacebookLogin
    appId="1010813445640879"
    autoLoad={false}
    fields="name,email,picture"
    callback={onFacebookLoginComplete} 
/>