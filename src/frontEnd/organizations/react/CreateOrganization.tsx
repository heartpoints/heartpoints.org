import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { newOrganizationFields } from '../reducers/newOrganizationFields';
import { Page } from '../../page/Page';
import { HPButton } from '../../forms/HPButton';
import { PageTitle } from '../../page/PageTitle';
import { Space } from '../../page/Space';
import { fakeFacebookUserSession } from '../../developers/fakeFacebookUserSession';

export const CreateOrganization = (props) => {
    const { bindFields, addNewOrganization, facebookUserSession = fakeFacebookUserSession } = props;
    const { email } = facebookUserSession
    const fields = bindFields(newOrganizationFields())
    return <Page>
        <PageTitle>Create Organization</PageTitle>
        <OrgAddEdit {...fields}>
            <HPButton label="Create Organization" shouldUseThemeSpacing={false} onClick={() => addNewOrganization(email)} />
        </OrgAddEdit>
        <Space />
    </Page>
}