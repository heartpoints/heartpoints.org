import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "../Site";
import { rootSiteElement } from "./rootSiteElement";
import { newSitePropsFromState } from "./newSiteProps";

export const renderApp = (state) => {
    window.onresize = () => renderApp(state)
    ReactDOM.render(
        <Site {...newSitePropsFromState(state)} />,
        rootSiteElement()
    );
};
