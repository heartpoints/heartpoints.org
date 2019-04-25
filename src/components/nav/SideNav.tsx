import * as React from "react";
import { Drawer, IconButton, Divider, List, ListItemIcon, ListItemText, withStyles, ListItem, AppBar, Collapse } from "@material-ui/core";

import InboxIcon from '@material-ui/icons/MoveToInbox';
import Language from '@material-ui/icons/Language';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DonutSmallIcon from '@material-ui/icons/DonutSmall';
import StarBorder from '@material-ui/icons/StarBorder';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Search from '@material-ui/icons/Search';
import PanTool from '@material-ui/icons/PanTool';
import Favorite from '@material-ui/icons/Favorite';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';

export const SideNavUnstyled = ({history, isSideNavOpen, isSideNavExpanded, onSideNavExpandRequested, classes, theme, onSideNavCollapseRequested}) => {
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
            <ListItem button onClick={onSideNavExpandRequested}>
              <ListItemIcon><Language /></ListItemIcon>
              <ListItemText primary="Organization" />
              {isSideNavExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isSideNavExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
             <ListItem button className={classes.nested}>
              <ListItemIcon>
                <AddCircleOutline />
              </ListItemIcon>
              <ListItemText inset primary="Create New" />
             </ListItem>
             <ListItem button className={classes.nested} onClick={() => history.push("/organizationSearch")}>
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText inset primary="Search" />
             </ListItem>
            </List>
            </Collapse>
            <ListItem button onClick={() => history.push("/volunteeringOptionSearch")}>
              <ListItemIcon><PanTool /></ListItemIcon>
              <ListItemText primary="Volunteer" />
            </ListItem>
            <ListItem button onClick={() => history.push("/") }>
              <ListItemIcon><Favorite /></ListItemIcon>
              <ListItemText primary="My Heart Collection" />
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
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export const SideNav = withStyles(styles, { withTheme: true })(SideNavUnstyled);