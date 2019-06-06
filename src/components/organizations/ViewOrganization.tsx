import * as React from 'react';
import { Page } from "../layouts/Page";
import { List } from '../../utils/list';
import { Organization } from '../../models/organization';

interface Props { organizations: Organization[], orgId:string }
export const ViewOrganization = ({orgId, organizations}:Props) => {
    const desiredOrgURL = `/organizations/${orgId}`
    const matchingOrganization = List(organizations).first(o => o.href == desiredOrgURL)
    
    const content = matchingOrganization.hasValue
        ? <LoadedOrganization {...matchingOrganization.value } />
        : <MissingOrganization />

    return <Page>{content}</Page>
}

const MissingOrganization = () => <p>Organization Not Found!</p>

const LoadedOrganization = ({imageThumbnailURL, title}:Organization) => <div>
    <h1>{title}</h1>
    <img src={imageThumbnailURL} />
</div>