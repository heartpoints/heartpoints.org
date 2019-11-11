import React, { useState } from 'react';
import { Organization } from '../data/organization';
import { DeleteButton } from '../../buttons/DeleteButton';
import { EditButton } from '../../buttons/EditButton';
import { PageTitle } from '../../page/PageTitle';
import { Typography, Grid } from '@material-ui/core';
import { Space } from '../../page/Space';
import { defaultOrgLogoSrc } from '../data/defaultOrgLogoSrc';
import { Image } from "../../forms/viewEditToggleables/Image";
import { VolunteeringPreview } from "../../volunteering/VolunteeringPreview";
import { jobTitleMatches } from '../../volunteering/jobTitleMatches';
import { previewContainerStyle } from "../../volunteering/VolunteeringPreview";

import { YesOrNoDialog } from '../../modals/YesOrNoDialog';
import { inDevMode } from '../../developers/inDevMode';

//todo: should these also use fields? maybe not "settable" fields but field readers (whether something is loaded / valid / etc)?
//todo: can we have fields that toggle between edit vs display mode over a field?\

export const noOpportunityContainerStyle = {
    ...previewContainerStyle,
    "cursor": "default"
}

export const LoadedOrganization = ({ creatorEmail, title, mission, imageThumbnailURL, homepage, navTo, href, volOpportunities, deleteOrganization, facebookUserSession }) => {

    const renderVolunteeringOpportunities = () => {
        return volOpportunities.length > 0
            ? volOpportunities.map(op => <VolunteeringPreview {...op} {...{navTo}} /> )
            : <div style={noOpportunityContainerStyle}>
                <Typography variant="h5">No Opportunities yet!</Typography>
            </div>
    }

    const userEmail = facebookUserSession ? facebookUserSession.email : "";
    const userIsCreator = userEmail == creatorEmail || inDevMode();

    const [shouldShowDialog, toggleDialog] = useState(false);

    const confirmOrgDelete = () => {
        deleteOrganization(href, title);
    }

    const cancelOrgDelete = () => {
        toggleDialog(false);
    }

    const deleteCurrentOrganizationRequested = () => {
        toggleDialog(true);
    }

    return <div>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
                <Image field={{value: imageThumbnailURL || defaultOrgLogoSrc}} isEditMode={false} />
            </Grid>
            <Grid item>
                <PageTitle>{title}
                    {userIsCreator && <React.Fragment>
                        <EditButton {...{navTo, onClick: () => navTo(`${href}/edit`)}} />
                        <DeleteButton onClick={deleteCurrentOrganizationRequested} />
                    </React.Fragment>}
                </PageTitle>
                {homepage && <Typography variant="caption"><strong>Homepage:</strong> <a href={homepage}>{homepage}</a></Typography>}
            </Grid>
        </Grid>
        <Space />
        {mission && <Typography variant="body1"><strong>Mission:</strong> {mission}</Typography>}
        <Space />
        <Typography variant="caption" style={{color: "lightgray"}}>Created by: {creatorEmail}</Typography>
        {renderVolunteeringOpportunities()}
        {shouldShowDialog && 
            <YesOrNoDialog 
                isOpen={shouldShowDialog} 
                titleText={`Delete ${title}?`} 
                onYesClicked={confirmOrgDelete} 
                onNoClicked={cancelOrgDelete} />
        }
    </div>
}