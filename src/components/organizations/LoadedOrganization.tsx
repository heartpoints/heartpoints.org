import * as React from 'react';
import { Organization } from './organization';
import { EditButton } from '../buttons/EditButton';
import { PageTitle } from '../page/PageTitle';
import { Typography, Grid } from '@material-ui/core';
import { Space } from '../page/Space';
import { logoStyle } from '../forms/logoStyle';
import { defaultOrgLogoSrc } from './defaultOrgLogoSrc';

//todo: should these also use fields? maybe not "settable" fields but field readers (whether something is loaded / valid / etc)?
export const LoadedOrganization = ({ creatorEmail, title, mission, imageThumbnailURL, homepage, navTo, href }: Organization & {navTo}) => <div>
    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        <Grid item>
            <img style={logoStyle} src={imageThumbnailURL || defaultOrgLogoSrc} />
        </Grid>
        <Grid item>
            <PageTitle>{title} <EditButton {...{navTo, href}} /></PageTitle>
            {homepage && <Typography variant="caption"><strong>Homepage:</strong> <a href={homepage}>{homepage}</a></Typography>}
        </Grid>
    </Grid>
    <Space />
    {mission && <Typography variant="body1"><strong>Mission:</strong> {mission}</Typography>}
    <Space />
    <Typography variant="caption" style={{color: "lightgray"}}>Created by: {creatorEmail}</Typography>
</div>
