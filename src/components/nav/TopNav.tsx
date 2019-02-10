import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, withStyles } from "@material-ui/core";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";
import MenuIcon from '@material-ui/icons/Menu';

export const TopNavUnstyled = props => {
    const { classes, onHamburgerClicked } = props;
    return <AppBar color="primary" position="static" className={classes.grow}>
        <Toolbar color="primary">
            <IconButton color="inherit" aria-label="Menu">
                <MenuIcon onClick={onHamburgerClicked} />
            </IconButton>
            <Typography variant="h4" color="inherit" className={classes.grow}>
                heartpoints.org
            </Typography>
            <FacebookLoginLogout {...props} />
        </Toolbar>
    </AppBar>
}

const styles = {
    grow: {
      flexGrow: 1,
    }
  };

export const TopNav = withStyles(styles)(TopNavUnstyled);