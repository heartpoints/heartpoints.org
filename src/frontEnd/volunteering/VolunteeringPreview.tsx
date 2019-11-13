import * as React from 'react';
import { Typography } from '@material-ui/core';
import { isMobile } from '../site/isMobile';

export const previewContainerStyle = {
    "marginTop": "10px",
    "padding": "10px",
    "backgroundColor": "#E9E9E9",
    "borderRadius": "5px",
    "cursor": "pointer",
}

export const VolunteeringPreview = (props) => {
    const { jobID, jobTitle, jobDescription, navTo } = props;
    const opportunityTitle = () => isMobile()
        ? "subtitle2"
        : "h5"

    const onSuggestionSelected = () => {
        navTo(`/volunteering/${jobID}`);
    }

    return <div style={previewContainerStyle} onClick={onSuggestionSelected}>
        <Typography variant={opportunityTitle()} gutterBottom>{jobTitle}</Typography>
        <Typography variant="caption">{jobDescription}</Typography>
    </div>
}