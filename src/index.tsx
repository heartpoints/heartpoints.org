import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/layouts/Site";
import Cookies from "js-cookie";
import { StatefulController } from "./components/state/StatefulController";
import { CastleRisk } from "./components/castleRisk/CastleRisk";
import { CastleRiskInitialState } from "./components/castleRisk/game";
import { StatefulControllerByProperty } from "./components/state/StatefulControllerByProperty";

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

    const onSideNavExpandRequested = () => {
        renderApp({
            ...state,
            isSideNavExpanded: !state.isSideNavExpanded
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

    const onFacebookLoginFailure = () => {
        renderApp({
            ...state
        });
    }

    const onSearchBarValueChange = (searchBarValue) => {
        const value = searchBarValue === undefined || searchBarValue === 0 ? '' : searchBarValue;
        renderApp({
            ...state,
            searchBarValue: value
        });
    }

    const statefulController = StatefulController(renderApp, state);
    const statefulControllerByProperty = StatefulControllerByProperty(statefulController);
    const castleRiskController = statefulControllerByProperty('castleRisk', CastleRiskInitialState);

    const {searchBarValue} = state;

    const siteProps = {
        ...state, 
        navigateToSimpleModel,
        onFacebookLoginComplete,
        onLogoutRequested,
        onSideNavCollapseRequested,
        onHamburgerClicked,
        onCelebrationXClicked,
        onSideNavExpandRequested,
        CastleRisk: castleRiskController(CastleRisk),
        onFacebookLoginFailure,
        onSearchBarValueChange
    }

    console.log('state',{searchBarValue})

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
const developers = ['tom@tommysullivan.me','mrcorn123@yahoo.com','tastulae@mail.usf.edu',"aashreya.isforever@gmail.com", 'patmetsch@roadrunner.com', 'nishijain2512@gmail.com']
const isDeveloper = facebookUserSession => facebookUserSession && developers.includes(facebookUserSession.email);
const inDevMode = isLocalhost() || isDeveloper(facebookUserSession);


const initialState = {
    showSimpleModel: false, 
    facebookUserSession, 
    currentUrl: window.location.href,
    isSideNavOpen: false,
    shouldShowCelebration: false,
    isSideNavExpanded: false,
    inDevMode,
    searchBarValue: '',
    searchBarSuggestions: [],
    shouldShowSearch: true
}

renderApp(initialState);