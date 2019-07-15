import * as React from "react";
import classNames from 'classnames';
import { CelebrationModal } from "../modals/CelebrationModal";
import { PossibleNavBars } from "../nav/PossibleNavBars";
import { CurrentRoute } from "../nav/CurrentRoute";
import { SiteProps } from "./SiteProps";

export const SiteWithoutStyle = (props: SiteProps) => {
  const { shouldShowCelebration, onCelebrationXClicked, isSideNavOpen, url } = props;
  const { classes, ...propsWithoutClasses } = props;
  return <React.Fragment>
  {1 < 2 && <CelebrationModal numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} />}
    <main className={classNames(classes.content, { [classes.contentShift]: isSideNavOpen })}>
      <PossibleNavBars {...{ history }} {...propsWithoutClasses} />
      {CurrentRoute(url, propsWithoutClasses)}
    </main>
  </React.Fragment>;
};
