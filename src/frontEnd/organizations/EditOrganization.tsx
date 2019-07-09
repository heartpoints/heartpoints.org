import * as React from 'react';
import { editOrganizationFields } from './editOrganizationFields';
import { Page } from '../page/Page';
import { orgHrefFromEditUrl } from './orgHrefFromEditUrl';
import { findOrgByHref } from './findOrgByHref';
import { MissingOrganization } from './MissingOrganization';
import { EditLoadedOrganization } from './EditLoadedOrganization';

export const EditOrganization = (props) => {
    const { bindFields, url, organizations } = props;
    const orgHref = orgHrefFromEditUrl(url)
    const content = findOrgByHref(organizations, orgHref)
        .map(org => <EditLoadedOrganization orgFields={bindFields(editOrganizationFields(org.href))} />)
        .valueOrDefault(<MissingOrganization />)
    
    return <Page>
        {content}
    </Page>
}