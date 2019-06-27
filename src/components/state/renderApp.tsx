import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "../site/Site";
import { rootSiteElement } from "./rootSiteElement";
import { sitePropsFromState } from "./sitePropsFromState";
import { updateStateToUseOnBackAndForwardNav } from "../nav/updateStateToUseOnBackAndForwardNav";
import { FieldBinder } from "../forms/types/FieldBinder";
import { Dictionary } from "lodash";
import { mapProperties } from "../../utils/list/mapProperties";

export const renderApp = (state) => {
    window.onresize = () => renderApp(state)
    updateStateToUseOnBackAndForwardNav(state)
    
    const bindField = (fieldBinder:FieldBinder<any,any>) => fieldBinder(state, renderApp)
    const bindFields = (fieldBinders:Dictionary<FieldBinder<any,any>>) => mapProperties(fieldBinders, bindField)

    const siteProps = {
        ...sitePropsFromState(state, renderApp),
        bindField,
        bindFields
    }

    ReactDOM.render(
        <Site {...siteProps} />,
        rootSiteElement()
    );
};
