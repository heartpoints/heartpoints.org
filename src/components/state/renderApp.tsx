import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "../Site";
import { rootSiteElement } from "./rootSiteElement";
import { sitePropsFromState } from "./sitePropsFromState";
import { updateStateToUseOnBackAndForwardNav } from "../nav/updateStateToUseOnBackAndForwardNav";

export const renderApp = (state) => {
    console.log({state})
    window.onresize = () => renderApp(state)
    updateStateToUseOnBackAndForwardNav(state)
    ReactDOM.render(
        <Site {...sitePropsFromState(state, renderApp)} />,
        rootSiteElement()
    );
};
