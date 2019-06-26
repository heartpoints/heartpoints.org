import * as React from 'react';
import { Fragment } from "react";
import { fileUploadHandler } from './fileUploadHandler';

export const FilePicker = ({onChange, acceptedContentTypes = "*", children}) => <Fragment>
    <input
        accept={acceptedContentTypes}
        style={{display: "none"}}
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={fileUploadHandler(onChange)}
    />
    <label htmlFor="contained-button-file">
        {children}
    </label>
</Fragment>