import * as React from "react";
import { HomePage } from "../welcome/HomePage";
import { FacebookSessionInfo } from "../facebook/FacebookSessionInfo";
import { TopNav } from "../nav/TopNav";
import { SideNav } from "../nav/SideNav";

import { Celebration } from "./Celebration";

export const Dev = props => {
    const {facebookUserSession} = props;
    return <React.Fragment>
        <TopNav {...props} />
        <SideNav {...props} />
        <HomePage />
        <FacebookSessionInfo {...{facebookUserSession}} />
        <Celebration numHeartpointsAwarded={10}/>
    </React.Fragment>
}