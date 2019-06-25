import * as React from "react";
import { withStyles } from "@material-ui/core";
import { CelebrationModal } from "./modals/CelebrationModal";
import classNames from 'classnames';
import { Url } from "../utils/url";
import { Organization } from "./organizations/organization";
import { PossibleNavBars } from "./nav/PossibleNavBars";
import { CurrentRoute } from "./nav/CurrentRoute";
import { rootStyles } from "../style/rootStyles";

type Props = {
  url:Url
  organizations: Organization[]
  [others:string]:any
  navTo
}

export const SiteWithoutStyle = (props:Props) => {
  const { shouldShowCelebration, onCelebrationXClicked, isSideNavOpen, url} = props;
  const { classes, ...propsWithoutClasses } = props;
  return <React.Fragment>
    <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen })}>
      <PossibleNavBars {...{history}} {...propsWithoutClasses} />
      {CurrentRoute(url, propsWithoutClasses)}
      { shouldShowCelebration && <CelebrationModal numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
    </main>
  </React.Fragment>
}

export const Site = withStyles(rootStyles)(SiteWithoutStyle);