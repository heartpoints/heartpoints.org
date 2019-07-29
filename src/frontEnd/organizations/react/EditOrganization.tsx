import * as React from 'react';
import { editOrganizationFields } from '../reducers/editOrganizationFields';
import { Page } from '../../page/Page';
import { orgHrefFromEditUrl } from '../data/orgHrefFromEditUrl';
import { findOrgByHref } from '../data/findOrgByHref';
import { MissingOrganization } from './MissingOrganization';
import { EditLoadedOrganization } from './EditLoadedOrganization';
import { WithUrl } from '../../../utils/url/WithUrl';
import { WithOrganizations } from '../data/WithOrganizations';
import { WithBindFields } from "../../state/fields/types/WithBindFields";

export type EditOrganizationProps<S, T> = WithUrl & WithOrganizations & WithBindFields<S, T>
export const EditOrganization = <S, T>(props:EditOrganizationProps<S, T>) => {
    const { bindFields, url, organizations } = props;
    const orgHref = orgHrefFromEditUrl(url.path)
    
    const content = findOrgByHref(organizations, orgHref)
        .map(({href}) => <EditLoadedOrganization orgFields={bindFields(editOrganizationFields(href))} />)
        .valueOrDefault(<MissingOrganization />)
    
    return <Page>
        {content}
    </Page>
}