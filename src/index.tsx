import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/Site";
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

    const onFacebookLoginFailure = () =>
        renderApp({
            ...state
        });

    const onSearchBarValueChange = (searchBarValue) =>
        renderApp({
            ...state,
            searchBarValue,
        });

    const updateNewOrgTitle = (newOrgTitle) => {
        renderApp({
            ...state,
            newOrgTitle
        });
    }

    const updateNewOrgMission = (newOrgMission) => {
        renderApp({
            ...state,
            newOrgMission
        });
    }

    const updateNewOrgUrl = (newOrgUrl) => {
        renderApp({
            ...state,
            newOrgUrl
        });
    }

    const updateNewOrgLogo = (newOrgLogo) => {
        renderApp({
            ...state,
            newOrgLogo,
        });
    }

    const addNewOrganization = () => {
        const newOrganization = {
            imageThumbnailURL: state.newOrgLogo.src,
            title: state.newOrgTitle,
            statement: state.newOrgMission,
            organizationURL: state.newOrgUrl
        };

        renderApp({
            ...state,
            organizations: [...state.organizations, newOrganization],
            newOrgTitle: '',
            newOrgMission: '',
            newOrgUrl: '',
            newOrgLogo: []
        });
    }

    const statefulController = StatefulController(renderApp, state);
    const statefulControllerByProperty = StatefulControllerByProperty(statefulController);
    const castleRiskController = statefulControllerByProperty('castleRisk', CastleRiskInitialState);

    const {searchBarValue} = state;
    const {volunteeringSearchBarValue} = state;

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
        onSearchBarValueChange,
        updateNewOrgTitle,
        updateNewOrgMission,
        addNewOrganization,
        updateNewOrgUrl,
        updateNewOrgLogo
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

const defaultOrganizations = [
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Heartpoints',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        organizationURL: "http://heartpoints.org"
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Some Organization',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
        organizationURL: "https://bing.com"
    },
    {
        imageThumbnailURL: "images/demo_icon.png",
        title: 'Altruistic Company',
        statement: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
        organizationURL: "https://yahoo.com"
    }
];

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
    shouldShowSearch: true,
    volunteeringSearchBarValue: '',
    volunteeringSearchBarSuggestions: [],
    newOrgTitle: '',
    newOrgMission: '',
    newOrgUrl: '',
    organizations: defaultOrganizations,
    newOrgLogo: [],
}

renderApp(initialState);