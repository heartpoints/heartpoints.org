import * as React from "react";
import { HomePage } from "../welcome/HomePage";
import { FacebookSessionInfo } from "../facebook/FacebookSessionInfo";
import { TopNav } from "../nav/TopNav";
import { SideNav } from "../nav/SideNav";

import { Celebration } from "./Celebration";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core";


const DevWithoutStyle = props => {
    const {classes, facebookUserSession, shouldShowCelebration, onCelebrationXClicked, isSideNavOpen} = props;
    return <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: isSideNavOpen,
          })}
        >
        <HomePage />
        { shouldShowCelebration && <Celebration numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
        <FacebookSessionInfo {...{facebookUserSession}} />
        </main>
    </React.Fragment>
}
const drawerWidth = 240;
const styles = theme => ({
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
})

export const Dev = withStyles(styles)(DevWithoutStyle)