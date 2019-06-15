import * as React from "react";
import { TopNav } from "./TopNav";
import { SideNav } from "./SideNav";
import { Fragment } from "react";

export const PossibleNavBars = (props) => {
  const { inDevMode } = props;
  return inDevMode ? <Fragment>
    <TopNav {...props} />
    <SideNav {...props} />
  </Fragment> : null;
};
