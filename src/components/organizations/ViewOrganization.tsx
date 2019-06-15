import * as React from 'react';
import { Page } from "../page/Page";
import { MissingOrganization } from './MissingOrganization';
import { LoadedOrganization } from './LoadedOrganization';
import { Organization } from './organization';
import { findOrgByHref } from './findOrgByHref';

interface Props {
    organizations: Organization[];
    href: string;
}

export const ViewOrganization = ({href, organizations}:Props) =>
    <Page>
    {
        findOrgByHref(organizations, href)
            .map(props => <LoadedOrganization {...props} />)
            .valueOrDefault(<MissingOrganization />)
    }
    </Page>