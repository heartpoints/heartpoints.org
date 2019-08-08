import { sitePropsFromState } from "../sitePropsFromState"
import { FieldBinder } from "../fields/types/FieldBinder"
import { mapProperties } from "../../../utils/list/mapProperties"
import { renderApp } from "./renderApp"

export const sitePropsForState = (state) => {
    const bindField = (fieldBinder: FieldBinder<any, any>) => fieldBinder(state, renderApp)
    const bindFields = fieldBinders => mapProperties(fieldBinders, bindField)
    return {
        ...sitePropsFromState(state, renderApp),
        bindField,
        bindFields
    }
}
