import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const HPButton = (props) => {
  const { onClick, label, children, shouldUseThemeSpacing = true } = props;
  const spacing = shouldUseThemeSpacing ? 1 : 0;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        margin: theme.spacing(spacing),
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
          backgroundColor: '#ff5252'
        }
      }
    }),
  );
  
  const classes = useStyles();
    
  return <Button className={classes.button} onClick={onClick} variant="contained">
      {label} {children}
  </Button>
}