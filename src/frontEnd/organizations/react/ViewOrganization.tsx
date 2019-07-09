import * as React from 'react';
import { Page } from "../../page/Page";
import { MissingOrganization } from './MissingOrganization';
import { LoadedOrganization } from './LoadedOrganization';
import { Organization } from '../data/organization';
import { findOrgByHref } from '../data/findOrgByHref';

interface Props {
    organizations: Organization[]
    href: string
    navTo
}

export const ViewOrganization = ({href, organizations, navTo}:Props) =>
    <Page>
    {
        findOrgByHref(organizations, href)
            .map(organization => <LoadedOrganization {...{...organization, navTo}} />)
            .valueOrDefault(<MissingOrganization />)
    }
    </Page>