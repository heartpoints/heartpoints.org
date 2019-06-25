import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';

//todo: the several org field props
export const CreateOrganization = (props) => {
    const { addNewOrganization, facebookUserSession: { email }} = props;
    return <OrgAddEdit 
        {...props} 
        onSaveClicked={() => addNewOrganization(email)}
    />
}