import * as React from "react";
import { HomePage } from "../welcome/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dev } from "./Dev";
import { NotFound } from "../nav/NotFound";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../../style/theme";
import { CssBaseline } from "@material-ui/core";

const theme = createMuiTheme(Theme);

export const Site = (props) => <BrowserRouter>
    <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider {...{theme}}>
            <Switch>
                <Route path="/dev" component={({history}) => <Dev {...props} {...{history}} />} />
                <Route exact path="/" component={HomePage} />
                <Route component={NotFound} />
            </Switch>
        </MuiThemeProvider>
    </React.Fragment>
</BrowserRouter>