import * as React from 'react';
import { editOrganizationFields } from '../reducers/editOrganizationFields';
import { Page } from '../../page/Page';
import { orgHrefFromEditUrl } from '../data/orgHrefFromEditUrl';
import { findOrgByHref } from '../data/findOrgByHref';
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