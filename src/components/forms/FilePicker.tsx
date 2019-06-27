import * as React from 'react';
import { Fragment } from "react";
import { uuid } from '../../utils/uuid';
import { fileUploadHandler } from './fileUploadHandler';

export const FilePicker = ({onChange, acceptedContentTypes = "*", children}) => {
    const id = uuid()
    return <Fragment>
        <input
            accept={acceptedContentTypes}
            style={{display: "none"}}
            id={id}
            multiple={false}
            type="file"
            onChange={fileUploadHandler(onChange)}
        />
        <label htmlFor={id}>
            {children}
        </label>
    </Fragment>
}