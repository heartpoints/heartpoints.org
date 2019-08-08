import * as React from "react"
import { InputForField } from "../InputForField"
import { EditButton } from "../../buttons/EditButton";

export const Text = (props) => {
    const { isEditMode, field } = props
    return isEditMode
        ? <React.Fragment>
            <InputForField {...{field}} {...props} />
            <EditButton {...{onClick: alert}} />
        </React.Fragment>
        : <React.Fragment>{field.value}</React.Fragment>
}