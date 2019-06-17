import * as React from 'react';
import { Organization } from './organization';
import { headerContainerChildStyle, statementStyle, urlStyle, imageStyle } from '../search/HPSearchResult';
import { viewOrgStatementStyle } from "./viewOrgStatementStyle";
import { EditButton } from '../buttons/EditButton';

//todo: should these also use fields? maybe not "settable" fields but field readers (whether something is loaded / valid / etc)?
export const LoadedOrganization = ({ creatorEmail, title, mission, imageThumbnailURL, homepage, navTo, href }: Organization & {navTo}) => <div>
    <div style={{ display: "inline" }}>
        <img style={imageStyle} src={imageThumbnailURL} />
        <h1 style={headerContainerChildStyle}>{title} <EditButton {...{navTo, href}} /></h1>
    </div>
    <p style={viewOrgStatementStyle}>{mission}</p>
    <a style={urlStyle} href={homepage}>{homepage}</a>
    <p style={statementStyle}>Created by: {creatorEmail}</p>
</div>