import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';

//todo: make the fields associated with the particular org being edited
export const EditOrganization = (props) => {
    const { addNewOrganization, facebookUserSession: { email }} = props;
    return <OrgAddEdit 
        {...props} 
        onSaveClicked={() => addNewOrganization(email)}
    />
}