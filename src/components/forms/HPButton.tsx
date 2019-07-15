import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        backgroundColor: '#ff5252'
      }
    },
    input: {
      display: 'none',
    }
  }),
);

export const HPButton = (props) => {
    const classes = useStyles();
    const { onClick, label, children } = props
    return <Button className={classes.button} onClick={onClick} variant="contained">
        {label} {children}
    </Button>
}
