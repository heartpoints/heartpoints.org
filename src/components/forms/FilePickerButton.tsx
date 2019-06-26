import * as React from 'react';
import { FilePicker } from './FilePicker';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

const classes = makeStyles((theme:Theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
}))

export const FilePickerButton = ({label, onChange, acceptedContentTypes = "*"}) =>
    <FilePicker {...{onChange, acceptedContentTypes}}>
        <Button variant="contained" component="span" className={classes().button}>
            {label}
        </Button>
    </FilePicker>
