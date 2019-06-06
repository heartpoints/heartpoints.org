import * as React from 'react';
import { Page } from "../layouts/Page";
import { List } from '../../utils/list';
import { Organization } from '../../models/organization';

import { headerContainerChildStyle, statementStyle, urlStyle, imageStyle} from '../search/HPSearchResult';

export const viewOrgStatementStyle = {
    ...statementStyle,
    "width": "400px"
}

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

const LoadedOrganization = ({creatorEmail, title, statement, imageThumbnailURL, organizationURL }:Organization) => <div>
    <div style={{display: "inline"}}>
        <img style={imageStyle} src={imageThumbnailURL} />
        <h1 style={headerContainerChildStyle}>{title}</h1>
    </div>
    <p style={viewOrgStatementStyle}>{statement}</p>
    <a style={urlStyle} href={organizationURL}>{organizationURL}</a>
    <p style={statementStyle}>{creatorEmail}</p>
</div>