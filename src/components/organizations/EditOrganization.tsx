import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { editOrganizationFields } from './editOrganizationFields';
import { Page } from '../page/Page';
import { HPButton } from '../forms/HPButton';
import { orgHrefFromEditUrl } from './orgHrefFromEditUrl';

export const EditOrganization = (props) => {
    const { bindFields, url } = props;
    const orgFields = bindFields(editOrganizationFields(orgHrefFromEditUrl(url)))
    return <Page>
        <h1>Edit Organization &quot;{orgFields.title.value}&quot;</h1>
        <OrgAddEdit {...orgFields} />
        <HPButton label="Done Editing" onClick={() => history.back()} />
    </Page>
}