import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/site";
import Cookies from "js-cookie";


const renderApp = (state) => {
    window.onhashchange = (event) => {
        const { newURL:currentUrl } = event;
        renderApp({...state, currentUrl });
    }
    const navigateToSimpleModel = () => renderApp({...state, showSimpleModel: true});
    const onFacebookLoginComplete = (facebookUserSession) => {
        Cookies.set('facebookUserSession', facebookUserSession)
        renderApp({...state, facebookUserSession});
    }
    const siteProps = {
        ...state, 
        navigateToSimpleModel,
        onFacebookLoginComplete
    }
    ReactDOM.render(
        <Site {...siteProps} />,
        document.getElementById("site")
    );
}

const facebookUserSessionString = Cookies.get('facebookUserSession');
const facebookUserSession = facebookUserSessionString && JSON.parse(facebookUserSessionString);
const initialState = {
    showSimpleModel: false, 
    facebookUserSession, 
    currentUrl: window.location.href
}

renderApp(initialState);