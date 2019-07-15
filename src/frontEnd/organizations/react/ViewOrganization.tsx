import * as React from 'react';
import { Page } from "../../page/Page";
import { MissingOrganization } from './MissingOrganization';
import { LoadedOrganization } from './LoadedOrganization';
import { findOrgByHref } from '../data/findOrgByHref';
import { WithOrganizations } from '../data/WithOrganizations';
import { WithNavTo } from '../../nav/WithNavTo';

export type ViewOrganizationProps = WithOrganizations & WithNavTo & { href: string }
export const ViewOrganization = ({href, organizations, navTo}:ViewOrganizationProps) =>
    <Page>
    {
        findOrgByHref(organizations, href)
            .map(organization => <LoadedOrganization {...{...organization, navTo}} />)
            .valueOrDefault(<MissingOrganization />)
    }
    </Page>