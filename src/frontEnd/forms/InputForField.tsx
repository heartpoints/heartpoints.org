import * as React from 'react';
import { textChangeHandler } from "./textChangeHandler";
import { TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isMobile } from '../site/isMobile';

export const InputForField = ({ value, setValue, placeholder, multiline = false, rows = 1 }) => {
    const {width, space} = isMobile()
      ? {width: "100%", space: 0}
      : {width: "300px", space: 1}

    const classes = makeStyles((theme:Theme) => ({
      textField: {
        marginLeft: theme.spacing(space),
        marginRight: theme.spacing(space),
        width
       },
    }))

    return <TextField
       label={placeholder}
        multiline={multiline}
        value={value === undefined || value === null ? "" : value}
        onChange={textChangeHandler(setValue)}
        className={classes().textField}
        margin="normal"
        variant="filled"
        rows={rows}
      />
    }
    
