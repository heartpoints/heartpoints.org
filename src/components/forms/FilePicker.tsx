import * as React from 'react';
import { Fragment } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { fileUploadHandler } from './fileUploadHandler';

const classes = makeStyles((theme:Theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}))

export const FilePicker = ({label, onChange, acceptedContentTypes = "*"}) => <Fragment>
    <input
        accept={acceptedContentTypes}
        style={{display: "none"}}
        id="contained-button-file"
        multiple={false}
        type="file"
        onChange={fileUploadHandler(onChange)}
    />
    <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes().button}>
            {label}
        </Button>
    </label>
</Fragment>