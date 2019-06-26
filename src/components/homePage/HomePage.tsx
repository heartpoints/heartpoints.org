import * as React from "react";
import { Typography, Container, Card } from "@material-ui/core";
import { Space } from "../page/Space";

export const HomePage = () => <Container className="vertical-center">
    <Card style={{textAlign: "center", verticalAlign: "middle"}}>
        <img width="100%" src="/images/logo.png" />
        <Typography variant="h4">help us build something amazing!</Typography>
        <Space />
        <Typography variant="h6">
            <a href="mailto:info@heartpoints.org">info@heartpoints.org</a> 
        </Typography>
        <Space />
    </Card>
</Container>