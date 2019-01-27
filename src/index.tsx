import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/site";

const renderApp = ({showSimpleModel, isDev}) => {
    const navigateToSimpleModel = () => renderApp({showSimpleModel: true, isDev})
    ReactDOM.render(
        <Site showSimpleModel={showSimpleModel} navigateToSimpleModel={navigateToSimpleModel} isDev={isDev} />,
        document.getElementById("site")
    );
}

const isDev = window.location.href.indexOf("localhost") > -1;
renderApp({showSimpleModel: false, isDev });