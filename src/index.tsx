import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/Site";
import Cookies from "js-cookie";
import { StatefulController } from "./components/state/StatefulController";
import { CastleRisk } from "./components/castleRisk/CastleRisk";
import { CastleRiskInitialState } from "./components/castleRisk/game";
import { StatefulControllerByProperty } from "./components/state/StatefulControllerByProperty";
import { defaultOrganizations } from "./data/defaultOrganizations";
import { createBrowserHistory } from "history";
import { Url } from "./utils/url";
import { identity } from "./utils/identity";

const history = createBrowserHistory()

const navTo = (state, path: string) => {
    const url = state.url.setPath(path)
    history.push(path)
    return {...state, url}
}

const navigateToSimpleModel = (state) => ({...state, showSimpleModel: true})

const onFacebookLoginComplete = (state, facebookUserSession) => {
    Cookies.set(facebookUserSessionCookieKey, facebookUserSession);
    const inDevMode = isDeveloper(facebookUserSession);
    return {...state, inDevMode, facebookUserSession, shouldShowCelebration: true};
}

const onLogoutRequested = (state) => {
    const {facebookUserSession, ...remainingState} = state;
    deleteSessionCookie();
    return {...remainingState, inDevMode: isLocalhost()};
}

const onSideNavExpandRequested = (state) => ({
    ...state,
    isSideNavExpanded: !state.isSideNavExpanded
})

const onSideNavCollapseRequested = (state) => ({
    ...state,
    isSideNavOpen: false
})

const onSearchBarValueChange = (state, searchBarValue) => {
    const value = searchBarValue === undefined || searchBarValue === 0 ? '' : searchBarValue;
    return {
        ...state,
        searchBarValue: value
    }
}

const onCelebrationXClicked = (state) => ({
    ...state,
    shouldShowCelebration: false
})

const onHamburgerClicked = (state) => ({
    ...state,
    isSideNavOpen: true
})

const updateNewOrgTitle = (state, newOrgTitle) => ({
    ...state,
    newOrgTitle
})

const updateNewOrgMission = (state, newOrgMission) => ({
    ...state,
    newOrgMission
})

const updateNewOrgUrl = (state, newOrgUrl) => ({
    ...state,
    newOrgUrl
})

const updateNewOrgLogo = (state, newOrgLogo) => ({
    ...state,
    newOrgLogo,
})

const addNewOrganization = (state, creatorEmail) => {
    const { organizations } = state;
    const href = `/organizations/${organizations.length + 1}`

    const newOrganization = {
        href,
        imageThumbnailURL: state.newOrgLogo.src,
        title: state.newOrgTitle,
        statement: state.newOrgMission,
        organizationURL: state.newOrgUrl,
        creatorEmail,
    };
    
    const stateWithNewOrg = {
        ...state,
        organizations: [...state.organizations, newOrganization],
        newOrgTitle: '',
        newOrgMission: '',
        newOrgUrl: '',
        newOrgLogo: [],
    }

    return navTo(stateWithNewOrg, href)
}

const renderApp = (state) => {

    const action = (stateHandler) => (...args) => {
        const newState = stateHandler(state, ...args)
        renderApp(newState);
    }

    window.onresize = () => {
        renderApp(state);
    }

    const statefulController = StatefulController(renderApp, state);
    const statefulControllerByProperty = StatefulControllerByProperty(statefulController);
    const castleRiskController = statefulControllerByProperty('castleRisk', CastleRiskInitialState);

    const siteProps = {
        ...state, 
        CastleRisk: castleRiskController(CastleRisk),
        addNewOrganization: action(addNewOrganization),
        navTo: action(navTo),
        navigateToSimpleModel: action(navigateToSimpleModel),
        onCelebrationXClicked: action(onCelebrationXClicked),
        onFacebookLoginComplete: action(onFacebookLoginComplete),
        onFacebookLoginFailure: action(identity),
        onHamburgerClicked: action(onHamburgerClicked),
        onLogoutRequested: action(onLogoutRequested),
        onSearchBarValueChange: action(onSearchBarValueChange),
        onSideNavCollapseRequested: action(onSideNavCollapseRequested),
        onSideNavExpandRequested: action(onSideNavExpandRequested),
        updateNewOrgLogo: action(updateNewOrgLogo),
        updateNewOrgMission: action(updateNewOrgMission),
        updateNewOrgTitle: action(updateNewOrgTitle),
        updateNewOrgUrl: action(updateNewOrgUrl),
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
const developers = ['tom@tommysullivan.me','mrcorn123@yahoo.com','tastulae@mail.usf.edu',"aashreya.isforever@gmail.com", 'patmetsch@roadrunner.com', 'nishijain2512@gmail.com']
const isDeveloper = facebookUserSession => facebookUserSession && developers.includes(facebookUserSession.email);
const inDevMode = isLocalhost() || isDeveloper(facebookUserSession);

const initialState = {
    facebookUserSession, 
    inDevMode,
    isSideNavExpanded: false,
    isSideNavOpen: false,
    newOrgLogo: [],
    newOrgMission: '',
    newOrgTitle: '',
    newOrgUrl: '',
    organizations: defaultOrganizations,
    searchBarSuggestions: [],
    searchBarValue: '',
    shouldShowCelebration: false,
    shouldShowSearch: true,
    showSimpleModel: false, 
    url: Url(window.location.href),
    volunteeringSearchBarSuggestions: [],
    volunteeringSearchBarValue: '',
}

renderApp(initialState);