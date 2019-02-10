import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/layouts/Site";
import Cookies from "js-cookie";
import { withRouter } from 'react-router-dom';

const renderApp = (state) => {
    window.onhashchange = (event) => {
        const { newURL:currentUrl } = event;
        renderApp({...state, currentUrl });
    }
    const navigateToSimpleModel = () => renderApp({...state, showSimpleModel: true});
    const onFacebookLoginComplete = (facebookUserSession) => {
        Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
        renderApp({...state, facebookUserSession});
    }
    const onLogoutRequested = () => {
        const {facebookUserSession, ...remainingState} = state;
        deleteSessionCookie();
        renderApp({remainingState});
    }
    const onProfilePicClicked = () => {
        renderApp({
            ...state,
            isProfilePicMenuOpen: true
        });
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
    const siteProps = {
        ...state, 
        navigateToSimpleModel,
        onFacebookLoginComplete,
        onLogoutRequested,
        onProfilePicClicked,
        onSideNavCollapseRequested,
        onHamburgerClicked
    }
    // const SiteWithRouter = withRouter(Site);
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
    isProfilePicMenuOpen: false,
    isSideNavOpen: false
}

renderApp(initialState);