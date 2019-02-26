import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, withStyles, CssBaseline } from "@material-ui/core";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';

export const TopNavUnstyled = props => {
    const { classes, onHamburgerClicked, isSideNavOpen } = props;
    return <div>
    <AppBar color="primary" position="fixed"
    className={classNames(classes.appBar, {
        [classes.appBarShift]: isSideNavOpen,
      })}>
        <Toolbar color="primary" disableGutters={!isSecureContext}>
            <IconButton color="inherit" aria-label="Menu" onClick={onHamburgerClicked}
            className={classNames(classes.drawerHeader, isSideNavOpen && classes.hide)}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" className={classes.grow}>
                heartpoints.org
            </Typography>
            <FacebookLoginLogout {...props} />
        </Toolbar>
    </AppBar>
    </div>
}

const drawerWidth = 240;

const styles = theme => ({
    grow: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
  });

export const TopNav = withStyles(styles)(TopNavUnstyled);