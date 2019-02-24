import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/layouts/Site";
import Cookies from "js-cookie";
import { CastleRiskController } from "./components/castleRisk";

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
        const inDevMode = isDeveloper(facebookUserSession);
        renderApp({...state, inDevMode, facebookUserSession, shouldShowCelebration: true});
    }
    const onLogoutRequested = () => {
        const {facebookUserSession, ...remainingState} = state;
        deleteSessionCookie();
        renderApp({...remainingState, inDevMode: isLocalhost() });
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
        onCelebrationXClicked,
        CastleRisk: () => CastleRiskController({renderApp, state: siteProps})
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
const isLocalhost = () => window.location.hostname == "localhost";
const developers = ['tom@tommysullivan.me','mrcorn123@yahoo.com','tastulae@mail.usf.edu',"aashreya.isforever@gmail.com"]
const isDeveloper = facebookUserSession => facebookUserSession && developers.includes(facebookUserSession.email);
const inDevMode = isLocalhost() || isDeveloper(facebookUserSession);

const initialState = {
    showSimpleModel: false, 
    facebookUserSession, 
    currentUrl: window.location.href,
    isSideNavOpen: false,
    shouldShowCelebration: false,
    inDevMode
}

renderApp(initialState);