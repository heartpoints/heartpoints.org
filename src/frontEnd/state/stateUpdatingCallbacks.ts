import { onFacebookLoginComplete } from "../facebook/onFacebookLoginComplete";
import { navTo } from "../nav/navTo";
import { onLogoutRequested } from "../facebook/onLogoutRequested";
import { onHamburgerClicked } from "../nav/onHamburgerClicked";
import { onSideNavExpandRequested } from "../nav/onSideNavExpandRequested";
import { onSideNavCollapseRequested } from "../nav/onSideNavCollapseRequested";
import { onSearchBarValueChange } from "../search/onSearchBarValueChange";
import { onCelebrationXClicked } from "../modals/onCelebrationXClicked";
import { onFacebookLoginFailure } from "../facebook/onFacebookLoginFailure";
import { updateState } from "../castleRisk/updateState";
import { Dictionary } from "lodash";
import { orgCallbacks } from "../organizations/reducers/orgCallbacks";

type StateUpdatingCallback = (state:any, ...args:any[]) => any

export const stateUpdatingCallbacks:Dictionary<StateUpdatingCallback> = {
    ...orgCallbacks(),
    navTo,
    onCelebrationXClicked,
    onFacebookLoginComplete,
    onFacebookLoginFailure,
    onHamburgerClicked,
    onLogoutRequested,
    onSearchBarValueChange,
    onSideNavCollapseRequested,
    onSideNavExpandRequested,
    updateState,
};
