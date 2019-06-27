import * as React from "react";
import { Fragment } from "react";
import { ellipsis } from "../../utils/ellipsis";
import { Typography, Grid } from "@material-ui/core";

export const headerContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px 0px"
}

export const padLeft = {
    "paddingLeft": "60px"
}

export const statementStyle = {
    "fontSize": "12px",
    "color": "#888",
    "fontStyle": "italic",
    ...padLeft,
}

export const urlStyle ={
    "fontSize": "15px",
    "color": "#99bdf7",
    "fontStyle": "italic",
    "paddingLeft": "60px"
}

export const imageStyle = {
    "width": "50px",
    "height": "50px",
}

const maxStatementLength = 125;

export const HPSearchResult = ({imageThumbnailURL, title, description, subtitle = undefined, homepage = ""}) =>
    <Grid container direction="row" justify="flex-start" alignItems="center" wrap="nowrap" spacing={2}>
        <Grid item>
            <img style={imageStyle} src={imageThumbnailURL} />
        </Grid>
        <Grid item>
            <Typography variant="h5"> {title}</Typography>
            {subtitle && <Typography variant="h6">{subtitle}</Typography>}
            <Typography variant="caption">
                {ellipsis(description, maxStatementLength)}
            </Typography>
        </Grid>
    </Grid>
