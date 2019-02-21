import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/layouts/Site";
import Cookies from "js-cookie";

const renderApp = (state) => {
    window.onhashchange = (event) => {
        const { newURL:currentUrl } = event;
        renderApp({...state, currentUrl });
    }
    window.onresize = () => {
        renderApp(state);
    }
    const navigateToSimpleModel = () => renderApp({...state, showSimpleModel: true});
    const onFacebookLoginComplete = (facebookUserSession) => {
        Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
        renderApp({...state, facebookUserSession, shouldShowCelebration: true});
    }
    const onLogoutRequested = () => {
        const {facebookUserSession, ...remainingState} = state;
        deleteSessionCookie();
        renderApp({remainingState});
    }
    const onSideNavCollapseRequested = () => {
        renderApp({
            ...state,
            isSideNavOpen: false
        });
    }
    const onHamburgerClicked = () => {
        renderApp({
            ...state,
            isSideNavOpen: true
        });
    }
    const onCelebrationXClicked = () => {
        renderApp({
            ...state,
            shouldShowCelebration: false
        });
    }
    const siteProps = {
        ...state, 
        navigateToSimpleModel,
        onFacebookLoginComplete,
        onLogoutRequested,
        onSideNavCollapseRequested,
        onHamburgerClicked,
        onCelebrationXClicked
    }
    ReactDOM.render(
        <Site {...siteProps} />,
        document.getElementById("site")
    );
}

const facebookUserSessionCookieKey = 'facebookUserSession';
const deleteSessionCookie = () => Cookies.remove(facebookUserSessionCookieKey);
const facebookUserSessionString = Cookies.get(facebookUserSessionCookieKey);
const facebookUserSession = facebookUserSessionString && JSON.parse(facebookUserSessionString);
const initialState = {
    showSimpleModel: false, 
    facebookUserSession, 
    currentUrl: window.location.href,
    isSideNavOpen: false,
    shouldShowCelebration: false,
}

renderApp(initialState);