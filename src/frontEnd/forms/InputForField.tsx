import * as React from 'react';
import { textChangeHandler } from "./textChangeHandler";
import { TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const textFieldStyle = window.innerWidth <= 480
  ? {width: "100%", space: 0}
  : {width: "300px", space: 1}

const classes = makeStyles((theme:Theme) => ({
    textField: {
      marginLeft: theme.spacing(textFieldStyle.space),
      marginRight: theme.spacing(textFieldStyle.space),
      width: textFieldStyle.width
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
