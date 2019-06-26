import * as React from 'react';
import { FilePicker } from './FilePicker';

export const ImagePicker = ({ imageField, imagePlaceholderSrc }) => <React.Fragment>
    <img style={{ width: "50px", maxWidth: "50px" }} src={imageField.value || imagePlaceholderSrc} />
    <FilePicker label="Upload Company Logo" onChange={imageField.setValue} /><br />
</React.Fragment>;
