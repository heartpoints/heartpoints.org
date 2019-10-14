import * as React from "react";
import { AppBar, Toolbar, IconButton, withStyles, CssBaseline } from "@material-ui/core";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { styles } from "./styles";
import { HeartpointsLogoAndName } from "./HeartpointsLogoAndName";

export const TopNavUnstyled = props => {
    const { classes, onHamburgerClicked, isSideNavOpen, navTo, inDevMode } = props;
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
            <HeartpointsLogoAndName typographyClass={grow} navTo={navTo} />
            {
                inDevMode ? <FacebookLoginLogout {...props} /> : null
            }
        </Toolbar>
    </AppBar>
}

export const TopNav = withStyles(styles)(TopNavUnstyled);