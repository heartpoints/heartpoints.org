import * as React from "react";
import { HomePage } from "./homePage/HomePage";
import { NotFound } from "./nav/NotFound";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../style/theme";
import { CssBaseline, withStyles } from "@material-ui/core";
import { SearchBar as OrgSearchBar } from "./organizations/SearchBar";
import { SearchBar as VolunteeringSearchBar } from "./volunteering/SearchBar";
import { CelebrationModal } from "./modals/CelebrationModal";
import { FacebookLoginLogout } from "./facebook/FacebookLoginLogout";
import classNames from 'classnames';
import { ViewOrganization } from "./organizations/ViewOrganization";
import { Switch, regexMatch } from "../utils/Switch";
import { Url } from "../utils/url";
import { CreateOrganization } from "./organizations/CreateOrganization";
import { Organization } from "./organizations/organization";
import { CastleRisk } from "./castleRisk/CastleRisk";
import { PossibleNavBars } from "./nav/PossibleNavBars";

type Props = {
  url:Url
  organizations: Organization[]
  [others:string]:any
}

export const SiteWithoutStyle = (props:Props) => {
  const theme = createMuiTheme(Theme);
  const {classes, shouldShowCelebration, onCelebrationXClicked, isSideNavOpen, url} = props;
  const { castleRisk } = props
  const mainPage = Switch
    .when(url.path)
    .case("/", <HomePage />)
    .case("/dev", <FacebookLoginLogout {...props} />)
    .case("/castleRisk", <CastleRisk {...castleRisk} {...props} />)
    .case("/organizations/search", <OrgSearchBar {...props} />)
    .case("/volunteering/search", <VolunteeringSearchBar {...props} />)
    .case("/organizations/new", <CreateOrganization {...props} />)
    .matches(regexMatch("/organizations/.+"), <ViewOrganization href={url.path} {...props} />)
    .result
    .valueOrDefault(<NotFound />)

  return <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
      <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen,})}>
      <MuiThemeProvider {...{theme}}>
        <PossibleNavBars {...{history}} {...props} />
        {mainPage}
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