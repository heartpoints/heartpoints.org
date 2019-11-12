import * as React from 'react';
import { textChangeHandler } from "./textChangeHandler";
import { TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles((theme:Theme) => ({
    textField: {
      width: "300px"
    },
}))

export const InputForField = 
    ({ value, setValue, placeholder, multiline = false, rows = 1 }) => 
    <TextField
        label={placeholder}
        multiline={multiline}
        value={value === undefined || value === null ? "" : value}
        onChange={textChangeHandler(setValue)}
        className={classes().textField}
        margin="normal"
        variant="filled"
        rows={rows}
      />
