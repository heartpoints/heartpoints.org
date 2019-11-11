import React from 'react';
import { Page } from '../page/Page';
import { Image } from '../forms/viewEditToggleables/Image';
import { defaultOrgLogoSrc } from '../organizations/data/defaultOrgLogoSrc';
import { Typography } from '@material-ui/core';
import { PageTitle } from '../page/PageTitle';
import { InputForField } from '../forms/InputForField';
import { Space } from '../page/Space';
import { TextAreaForField } from '../forms/TextAreaForField';
import { HPButton } from '../forms/HPButton';
import {addNewVolOpportunity} from './addNewVolOpportunity';
import { fakeFacebookUserSession } from '../developers/fakeFacebookUserSession';

export const LoadFullVolOpportunityForm = (props) => {
    const {title,imageThumbnailURL, creatorEmail, volOpportunities, facebookUserSession = fakeFacebookUserSession, navTo} = props; 
    const {email} = facebookUserSession;
    console.log('email: '+ email);
    return <React.Fragment>
        <Space />
        {/* <InputForField {} />
        <TextAreaForField {} /> */}
        <HPButton label='Create Job' onClick = {() => addNewVolOpportunity(email, creatorEmail)} />
    </React.Fragment>
}