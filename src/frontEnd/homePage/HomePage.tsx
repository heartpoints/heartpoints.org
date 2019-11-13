import * as React from "react";
import { Typography, Container, Card } from "@material-ui/core";
import { Space } from "../page/Space";
import { MiscSnackBar } from "../modals/MiscSnackBar";
import { isMobile } from "../site/isMobile";

const containerStyle = {
    minHeight: "90vh",
    display: "flex",
    alignItems: "center"
}

const subtitleSize = () => isMobile() ? "subtitle1" : "h4";

export const HomePage = ({shouldShowSnackbar, snackbarText, onDisplayHomeSnackbar}) => { 
    const snackbarProps = {
        snackbarText,
        onDisplayHomeSnackbar
    }
    return <Container style={containerStyle}>
        <Card style={{textAlign: "center", verticalAlign: "middle"}}>
            <img width="100%" src="/images/logo.png" />
            <Typography variant={subtitleSize()}>help us build something amazing!</Typography>
            <Space />
            <Typography variant="h6">
                <a href="mailto:info@heartpoints.org">info@heartpoints.org</a> 
            </Typography>
            <Space />
        </Card>
        {shouldShowSnackbar && <MiscSnackBar {...snackbarProps} />}
    </Container>
}