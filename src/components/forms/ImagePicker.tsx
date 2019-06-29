import * as React from 'react';
import { FilePicker } from './FilePicker';
import { Typography, Tooltip } from '@material-ui/core';
import { logoStyle } from './logoStyle';

const logoEditStyle = {
    ...logoStyle,
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

export const ImagePicker = ({ field, style = {} }) => <div style={divStyle}>
    <FilePicker onChange={field.setValue} acceptedContentTypes="image/*">
        <Tooltip title="upload image" placement="right">
            <img style={{...logoEditStyle, ...style}} src={field.value || field.placeholder } />
        </Tooltip>
        <br />
    </FilePicker>
    <Typography variant="caption">{field.title}</Typography>
</div>
