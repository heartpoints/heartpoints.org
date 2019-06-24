import * as React from "react";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../style/theme";
import { CssBaseline, withStyles } from "@material-ui/core";
import { CelebrationModal } from "./modals/CelebrationModal";
import classNames from 'classnames';
import { Url } from "../utils/url";
import { Organization } from "./organizations/organization";
import { PossibleNavBars } from "./nav/PossibleNavBars";
import { CurrentRoute } from "./nav/CurrentRoute";

type Props = {
  url:Url
  organizations: Organization[]
  [others:string]:any
  navTo
}

export const SiteWithoutStyle = (props:Props) => {
  const theme = createMuiTheme(Theme);
  const {classes, shouldShowCelebration, onCelebrationXClicked, isSideNavOpen, url} = props;

  return <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
      <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen,})}>
      <MuiThemeProvider {...{theme}}>
        <PossibleNavBars {...{history}} {...props} />
        {CurrentRoute(url, props)}
        { shouldShowCelebration && <CelebrationModal numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
      </MuiThemeProvider>
      </main>
    </div>
  </React.Fragment>
}

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
      },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      },
})

export const Site = withStyles(styles)(SiteWithoutStyle);