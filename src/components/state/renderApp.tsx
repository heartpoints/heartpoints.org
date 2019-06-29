import * as React from "react";
import * as ReactDOM from "react-dom";

import { Site } from "../site/Site";
import { rootSiteElement } from "./rootSiteElement";
import { sitePropsFromState } from "./sitePropsFromState";
import { updateStateToUseOnBackAndForwardNav } from "../nav/updateStateToUseOnBackAndForwardNav";
import { FieldBinder } from "../forms/types/FieldBinder";
import { Dictionary } from "lodash";
import { mapProperties } from "../../utils/list/mapProperties";
import { Field } from "../forms/types/Field";

export type FieldBinders<S, T> = Dictionary<FieldBinder<S,T>>
export type BoundFields<T> = Dictionary<Field<T>>
export type BindFields<S, T> = (fieldBinders:FieldBinders<S, T>) => BoundFields<T>

export type BindField<S, T> = (fieldBinder:FieldBinder<S, T>) => Field<T>

export type WithBindFields<S, T> = {
    bindFields: BindFields<S, T>
}

export type WithBindField<S, T> = {
    bindField: BindField<S, T>
}

export const renderApp = <S,>(state:S) => {
    window.onresize = () => renderApp(state)
    updateStateToUseOnBackAndForwardNav(state)
    
    const bindField = (fieldBinder:FieldBinder<any,any>) => fieldBinder(state, renderApp)
    const bindFields = fieldBinders => mapProperties(fieldBinders, bindField)

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
