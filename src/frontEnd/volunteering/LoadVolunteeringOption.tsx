import React, { useState } from 'react';
import {Grid, Typography} from '@material-ui/core';
import { Space } from '../page/Space';
import { Image } from "../forms/viewEditToggleables/Image";
import { PageTitle } from '../page/PageTitle';
import { EditButton } from '../buttons/EditButton';
import { defaultOrgLogoSrc } from '../organizations/data/defaultOrgLogoSrc';
import { Page } from '../page/Page';
import { HPButton } from '../forms/HPButton';
import { DeleteButton } from '../buttons/DeleteButton';
import { YesOrNoDialog } from '../modals/YesOrNoDialog';
import { inDevMode } from '../developers/inDevMode';

export const LoadVolunteeringOption = ({creatorEmail, imageThumbnailURL, title, href, jobTitle, jobDescription, navTo, deleteOpportunity, facebookUserSession, jobID}) => {

    const userEmail = facebookUserSession ? facebookUserSession.email : "";
    const userIsCreator = userEmail == creatorEmail || inDevMode();

    const [shouldShowDialog, toggleDialog] = useState(false);

    const confirmOppDelete = () => {
        deleteOpportunity(jobTitle, jobID);
    }

    const cancelOppDelete = () => {
        toggleDialog(false);
    }

    const deleteCurrentOpportunityRequested = () => {
        toggleDialog(true);
    }

    return(
        <Page>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item>
                    <Image field={{value: imageThumbnailURL || defaultOrgLogoSrc}} isEditMode={false} />
                </Grid>
                <Grid item>
                    <PageTitle>{jobTitle}
                        {userIsCreator && <React.Fragment>
                            <EditButton {...{navTo, onClick: () => alert(href)}} />
                            <DeleteButton onClick={deleteCurrentOpportunityRequested} />
                        </React.Fragment>}
                    </PageTitle>
                    <Space />
                    <Typography variant="h6">
                        {title} 
                    </Typography>
                    <HPButton label="View Organization" shouldUseThemeSpacing={false} onClick={() => navTo(href)} />
                </Grid>
            </Grid>
            <Space />
            <Typography variant="body1"><strong>Job Description:</strong> {jobDescription}</Typography>
            <Space />
            <Typography variant="caption" style={{color: "lightgray"}}>Created by: {creatorEmail}</Typography>
            { shouldShowDialog && 
                <YesOrNoDialog 
                    isOpen={shouldShowDialog}
                    titleText={`Delete ${jobTitle}?`}
                    onYesClicked={confirmOppDelete}
                    onNoClicked={cancelOppDelete} />}
        </Page>
    );
}