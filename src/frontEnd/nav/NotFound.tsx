import * as React from "react";
import { Page } from "../page/Page";
import { PageTitle } from "../page/PageTitle";
import { Typography, Link } from "@material-ui/core";

export const NotFound = () => <Page>
    <PageTitle>Not Found</PageTitle>
    <Typography variant="body1">
        Sorry, but there was an error finding the resource(s) you were seeking. Please <a onClick={() => history.back()}>go back</a> or
        visit the <a href="/">home page</a>.
    </Typography>
</Page>