import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/site";

const renderApp = ({showSimpleModel, isDev, facebookUserSession}) => {
    const navigateToSimpleModel = () => renderApp({showSimpleModel: true, isDev, facebookUserSession});
    const onFacebookLoginComplete = (facebookUserSession) => renderApp({showSimpleModel: showSimpleModel, isDev, facebookUserSession});
    ReactDOM.render(
        <Site showSimpleModel={showSimpleModel} navigateToSimpleModel={navigateToSimpleModel} isDev={isDev} facebookUserSession={facebookUserSession} onFacebookLoginComplete={onFacebookLoginComplete} />,
        document.getElementById("site")
    );
}

const isDev = window.location.href.indexOf("localhost") > -1;
const facebookUserSession = undefined;
renderApp({showSimpleModel: false, isDev, facebookUserSession });