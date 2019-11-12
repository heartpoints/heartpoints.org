import * as React from 'react';
import { Typography } from '@material-ui/core';

export const previewContainerStyle = {
    "marginTop": "2vh",
    "padding": "1.2vw",
    "backgroundColor": "#E9E9E9",
    "borderRadius": "0.5em",
    "cursor": "pointer",
}

export const VolunteeringPreview = (props) => {
    const { jobID, jobTitle, jobDescription, navTo } = props;

    const onSuggestionSelected = () => {
        navTo(`/volunteering/${jobID}`);
    }

    return <div style={previewContainerStyle} onClick={onSuggestionSelected}>
        <Typography variant="h5" gutterBottom>{jobTitle}</Typography>
        <Typography variant="caption">{jobDescription}</Typography>
    </div>
}