import * as React from 'react';
import { FilePicker } from './FilePicker';
import { Typography, Tooltip } from '@material-ui/core';

const imageStyle = { 
    width: "75px",
    maxWidth: "75px",
    cursor: "pointer",
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "lightgray",
}

const divStyle = {
    marginLeft: "10px",
    marginBottom: "0px",
    paddingBottom: "0px",
}

export const ImagePicker = ({ imageField, imagePlaceholderSrc, caption }) => <div style={divStyle}>
    <FilePicker onChange={imageField.setValue} acceptedContentTypes="image/*">
        <Tooltip title="upload image" placement="right">
            <img style={imageStyle} src={imageField.value || imagePlaceholderSrc} />
        </Tooltip>
        <br />
    </FilePicker>
    <Typography variant="caption">{caption}</Typography>
</div>
