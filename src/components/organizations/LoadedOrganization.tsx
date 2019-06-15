import * as React from 'react';
import { Organization } from './organization';
import { headerContainerChildStyle, statementStyle, urlStyle, imageStyle } from '../search/HPSearchResult';
import { viewOrgStatementStyle } from "./viewOrgStatementStyle";
import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({navTo, organizationURL}) => <EditIcon onClick={() => navTo(`${organizationURL}/edit`)}/>

export const LoadedOrganization = ({ creatorEmail, title, statement, imageThumbnailURL, organizationURL, navTo }: Organization & {navTo}) => <div>
    <div style={{ display: "inline" }}>
        <img style={imageStyle} src={imageThumbnailURL} />
        <h1 style={headerContainerChildStyle}>{title} <EditButton {...{navTo, organizationURL}} /></h1>
    </div>
    <p style={viewOrgStatementStyle}>{statement}</p>
    <a style={urlStyle} href={organizationURL}>{organizationURL}</a>
    <p style={statementStyle}>Created by: {creatorEmail}</p>
</div>;
