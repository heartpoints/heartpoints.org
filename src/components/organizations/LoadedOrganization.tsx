import * as React from 'react';
import { Organization } from './organization';
import { headerContainerChildStyle, statementStyle, urlStyle, imageStyle } from '../search/HPSearchResult';
import { viewOrgStatementStyle } from "./viewOrgStatementStyle";
import EditIcon from '@material-ui/icons/Edit';

const EditButton = ({navTo, href}) => <EditIcon onClick={() => navTo(`${href}/edit`)}/>

export const LoadedOrganization = ({ creatorEmail, title, mission, imageThumbnailURL, homepage, navTo, href }: Organization & {navTo}) => <div>
    <div style={{ display: "inline" }}>
        <img style={imageStyle} src={imageThumbnailURL} />
        <h1 style={headerContainerChildStyle}>{title} <EditButton {...{navTo, href}} /></h1>
    </div>
    <p style={viewOrgStatementStyle}>{mission}</p>
    <a style={urlStyle} href={homepage}>{homepage}</a>
    <p style={statementStyle}>Created by: {creatorEmail}</p>
</div>;