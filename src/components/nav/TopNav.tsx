import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, withStyles, CssBaseline } from "@material-ui/core";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { styles } from "./styles";

export const TopNavUnstyled = props => {
    const { classes, onHamburgerClicked, isSideNavOpen } = props;
    const { hide, grow, appBar, appBarShift } = classes

    const appBarClassName = classNames(
      appBar,
      { [appBarShift]: isSideNavOpen },
    )

    const hamburgerClassName = classNames({ [hide]: isSideNavOpen })

    return <AppBar color="primary" position="fixed" className={appBarClassName}>
        <Toolbar color="primary" disableGutters={!isSecureContext}>
            <IconButton color="inherit" aria-label="Menu" onClick={onHamburgerClicked} className={hamburgerClassName}>
                <MenuIcon />
            </IconButton>
            <img style={{width: "35px", height: "21px", margin: "12px 10px"}} src="/images/hand-with-heart.png" />
            <Typography variant="h4" color="inherit" className={grow}>
                heartpoints.org
            </Typography>
            <FacebookLoginLogout {...props} />
        </Toolbar>
    </AppBar>
}

export const TopNav = withStyles(styles)(TopNavUnstyled);