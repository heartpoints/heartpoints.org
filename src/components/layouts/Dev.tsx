import * as React from "react";
import { HomePage } from "../welcome/HomePage";
import { FacebookSessionInfo } from "../facebook/FacebookSessionInfo";
import { TopNav } from "../nav/TopNav";
import { SideNav } from "../nav/SideNav";

import { Celebration } from "./Celebration";

export const Dev = props => {
    const {facebookUserSession, shouldShowCelebration, onCelebrationXClicked} = props;
    return <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
        <HomePage />
        { shouldShowCelebration && <Celebration numHeartpointsAwarded={10} onXClicked={onCelebrationXClicked} /> }
        <FacebookSessionInfo {...{facebookUserSession}} />
    </React.Fragment>
}

const If = ({condition, children}) => condition ? children : null;