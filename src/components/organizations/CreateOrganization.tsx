import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { newOrganizationFields } from './newOrganizationFields';
import { Page } from '../page/Page';
import { HPButton } from '../forms/HPButton';

export const CreateOrganization = (props) => {
    const { bindFields, addNewOrganization, facebookUserSession: { email }, } = props;
    const fields = bindFields(newOrganizationFields())
    return <Page>
        <h1>Create Organization</h1>
        <OrgAddEdit {...fields} />
        <HPButton label="Create" onClick={() => addNewOrganization(email)} />
    </Page>
}