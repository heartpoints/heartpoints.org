import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { newOrganizationFields } from './newOrganizationFields';
import { Page } from '../page/Page';
import { HPButton } from '../forms/HPButton';
import { PageTitle } from '../page/PageTitle';
import { Space } from '../page/Space';

export const CreateOrganization = (props) => {
    const { bindFields, addNewOrganization, facebookUserSession: { email }, } = props;
    const fields = bindFields(newOrganizationFields())
    return <Page>
        <PageTitle>Create Organization</PageTitle>
        <OrgAddEdit {...fields} />
        <HPButton label="Create Organization" onClick={() => addNewOrganization(email)} />
        <Space />
    </Page>
}