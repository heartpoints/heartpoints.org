import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "./components/Site";
import { rootSiteElement } from "./rootSiteElement";
import { newSiteProps } from "./newSiteProps";

export const renderApp = (state) => {
    window.onresize = () => renderApp(state)
    ReactDOM.render(
        <Site {...newSiteProps(state)} />,
        rootSiteElement()
    );
};
