import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "../Site";
import { rootSiteElement } from "./rootSiteElement";
import { newSitePropsFromState } from "./newSiteProps";
import { updateStateToUseOnBackAndForwardNav } from "../nav/updateStateToUseOnBackAndForwardNav";

export const renderApp = (state) => {
    window.onresize = () => renderApp(state)
    updateStateToUseOnBackAndForwardNav(state)
    ReactDOM.render(
        <Site {...newSitePropsFromState(state)} />,
        rootSiteElement()
    );
};