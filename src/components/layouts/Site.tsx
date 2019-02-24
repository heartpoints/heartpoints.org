import * as React from "react";
import { HomePage } from "../welcome/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound } from "../nav/NotFound";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../../style/theme";
import { CssBaseline } from "@material-ui/core";
import { CastleRisk } from "../../components/castleRisk/CastleRisk";
import { TopNav } from "../nav/TopNav";
import { SideNav } from "../nav/SideNav";
import { FacebookSessionInfo } from "../facebook/FacebookSessionInfo";
import { Celebration } from "./Celebration";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";

export const Site = (props) => {
    const theme = createMuiTheme(Theme);
    const {inDevMode, facebookUserSession, shouldShowCelebration, onCelebrationXClicked, DevMode} = props;
    return <BrowserRouter>
        <React.Fragment>
            <CssBaseline />
            <MuiThemeProvider {...{theme}}>
                <Route path="/" component={routerProps => <PossibleNavBars {...routerProps} {...props} />} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/dev" component={() => <FacebookLoginLogout {...props} />} />
                    <Route path="/castleRisk" component={() => <CastleRisk />} />
                    <Route component={NotFound} />
                </Switch>    
                { shouldShowCelebration && <Celebration numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
            </MuiThemeProvider>
        </React.Fragment>
    </BrowserRouter>
}

const PossibleNavBars = (props) => {
    const { inDevMode } = props;
    return inDevMode ? <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
    </React.Fragment> : null;
}