import * as React from "react";
import { HomePage } from "./welcome/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound } from "./nav/NotFound";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../style/theme";
import { CssBaseline, withStyles } from "@material-ui/core";
import { TopNav } from "./nav/TopNav";
import { SideNav } from "./nav/SideNav";
import { SearchBarMerged } from "./search/SearchBarMerged";
import { SearchBar } from "./organizations/SearchBar";
import { CelebrationModal } from "./modals/CelebrationModal";
import { FacebookLoginLogout } from "./facebook/FacebookLoginLogout";
import classNames from 'classnames';

export const SiteWithoutStyle = (props) => {
    const theme = createMuiTheme(Theme);
    const {classes, shouldShowCelebration, onCelebrationXClicked, CastleRisk, isSideNavOpen, onSearchBarValueChange } = props;
    return <BrowserRouter>
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
            <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen,})}>
            <MuiThemeProvider {...{theme}}>
                <Route path="/" component={routerProps => <PossibleNavBars {...routerProps} {...props} />} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/dev" component={() => <FacebookLoginLogout {...props} />} />
                    <Route path="/castleRisk" component={routerProps => <div><CastleRisk {...routerProps} {...props}/></div>} />
                    <Route path="/organizations/search" render={() => <div style={{margin: "150px auto"}}><SearchBar {...props} /></div>} />
                    <Route path="/volunteering/search" render={() => <div style={{margin: "150px auto"}}><SearchBarMerged {...props} id='volunteer' /></div>} />
                    <Route component={NotFound} />
                </Switch>    
                { shouldShowCelebration && <CelebrationModal numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
            </MuiThemeProvider>
            </main>
            </div>
        </React.Fragment>
    </BrowserRouter>
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

const PossibleNavBars = (props) => {
    const { inDevMode } = props;
    return inDevMode ? <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
    </React.Fragment> : null;
}