import * as React from "react";
import { HomePage } from "./welcome/HomePage";
import { NotFound } from "./nav/NotFound";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Theme } from "../style/theme";
import { CssBaseline, withStyles } from "@material-ui/core";
import { TopNav } from "./nav/TopNav";
import { SideNav } from "./nav/SideNav";
import { SearchBar as OrgSearchBar } from "./organizations/SearchBar";
import { SearchBar as VolunteeringSearchBar } from "./volunteering/SearchBar";
import { CelebrationModal } from "./modals/CelebrationModal";
import { FacebookLoginLogout } from "./facebook/FacebookLoginLogout";
import classNames from 'classnames';
import { ViewOrganization } from "./organizations/ViewOrganization";
import { Switch, regexMatch } from "../utils/Switch";
import { Url } from "../utils/url";
import { EmptyList } from "../utils/list";
import { CreateOrganization } from "./organizations/CreateOrganization";

type Props = {
  url:Url,
  [others:string]:any,
}

export const SiteWithoutStyle = (props:Props) => {
  const theme = createMuiTheme(Theme);
  const {classes, shouldShowCelebration, onCelebrationXClicked, CastleRisk, isSideNavOpen, organizations, url} = props;
  const mainPageProps = {...props, history}
  const mainPage = Switch
    .when(url.path)
    .case("/", <HomePage />)
    .case("/dev", <FacebookLoginLogout {...props} />)
    .case("/castleRisk", <CastleRisk {...mainPageProps} />)
    .case("/organizations/search", <OrgSearchBar {...props} />)
    .case("/volunteering/search", <VolunteeringSearchBar {...props} />)
    .case("/organizations/new", <CreateOrganization {...props} />)
    .matches(regexMatch("/organizations/.+"), <ViewOrganization href={url.path} {...props} {...{organizations}} />)
    .result
    .valueOrDefault(<NotFound />)

  return <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
      <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen,})}>
      <MuiThemeProvider {...{theme}}>
        <PossibleNavBars {...{history}} {...props} />} />
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

const PossibleNavBars = (props) => {
    const { inDevMode } = props;
    return inDevMode ? <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
    </React.Fragment> : null;
}