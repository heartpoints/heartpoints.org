import * as React from 'react';
import { Page } from '../page/Page';
import { PageTitle } from '../page/PageTitle';
import { Typography, Grid } from '@material-ui/core';
import { Space } from '../page/Space';

export const UserProfile = ({facebookUserSession}) => {

    const loggedInContent = () => {
        const {name, email, picture} = facebookUserSession;
        return <React.Fragment>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item>
                    <img src={picture.data.url} />
                </Grid>
                <Grid item>
                    <PageTitle>{`${name}'s Profile`}</PageTitle>
                    <Typography variant="caption"><a href={`mailto:${email}`}>{email}</a></Typography>
                </Grid>
            </Grid>
            <Space />
            <Typography variant="h5">Heartpoints Wallet</Typography>
        </React.Fragment>
    }

    const renderUserProfile = () => {
        const content = facebookUserSession
            ? loggedInContent()
            : <PageTitle>Not Logged In!</PageTitle>

        return content
    }

    return <Page>
        {renderUserProfile}
    </Page>
}