import * as React from "react"
import { InputForField } from "../InputForField"
import { EditButton } from "../../buttons/EditButton"

/*

Problem 1: How do I switch to edit mode when they click?
    - where do i keep the state of what mode we are in?
    - that state is tied to the DOM tree, not necessarily to the field itself
*/

export const Text = (props) => {
    const { isEditable, isEditMode, field, onEditModeRequested } = props
    return isEditable && isEditMode
        ? <React.Fragment>
            <InputForField {...{field}} {...props} />
        </React.Fragment>
        : <React.Fragment>
            {field.value}
            {isEditable && <EditButton {...{onClick: onEditModeRequested}} />}
        </React.Fragment>
}