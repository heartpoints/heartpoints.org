import * as React from "react"
import { InputForField } from "../InputForField"
import { EditButton } from "../../buttons/EditButton";

export const Text = (props) => {
    const {isEditable, isEditMode, field, navTo } = props
    return isEditMode
        ? <React.Fragment>
            <InputForField {...{field}} {...props} />
            <EditButton {...{navTo, onClick: alert}} />
        </React.Fragment>
        : <React.Fragment>{field.value}</React.Fragment>
}