import * as React from "react";
import { Drawer, IconButton, Divider, List, ListItemIcon, ListItemText, withStyles, ListItem, AppBar } from "@material-ui/core";

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import classNames from 'classnames';

export const SideNavUnstyled = ({history, isSideNavOpen, classes, theme, onSideNavCollapseRequested}) => {
    return <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isSideNavOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={onSideNavCollapseRequested}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => history.push("/") }>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => history.push("/castleRisk") }>
              <ListItemIcon><DonutSmallIcon /></ListItemIcon>
              <ListItemText primary="Castle Risk" />
            </ListItem>
          </List>
    </Drawer>
}

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    display: 'flex',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

export const SideNav = withStyles(styles, { withTheme: true })(SideNavUnstyled);