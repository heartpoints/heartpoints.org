import * as React from 'react';
import { Page } from "../../page/Page";
import { MissingOrganization } from './MissingOrganization';
import { LoadedOrganization } from './LoadedOrganization';
import { findOrgByHref } from '../data/findOrgByHref';
import { WithOrganizations } from '../data/WithOrganizations';
import { WithNavTo } from '../../nav/WithNavTo';
import { WithUrl } from '../../../utils/url/WithUrl';

export type ViewOrganizationProps = WithOrganizations & WithNavTo & WithUrl
export const ViewOrganization = ({url, organizations, navTo}:ViewOrganizationProps) => {

    const content = findOrgByHref(organizations, url.path)
        .map(organization => <LoadedOrganization {...{...organization, navTo}} />)
        .valueOrDefault(<MissingOrganization />)

    return <Page>
        {content}
    </Page>
}