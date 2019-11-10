import { onFacebookLoginComplete } from "../facebook/onFacebookLoginComplete";
import { navTo } from "../nav/navTo";
import { onLogoutRequested } from "../facebook/onLogoutRequested";
import { onHamburgerClicked } from "../nav/onHamburgerClicked";
import { onSideNavExpandRequested } from "../nav/onSideNavExpandRequested";
import { onSideNavCollapseRequested } from "../nav/onSideNavCollapseRequested";
import { onOrgSearchBarValueChange } from "../search/onOrgSearchBarValueChange";
import { onVolSearchBarValueChange } from '../search/onVolSearchBarValueChange';
import { onCelebrationXClicked } from "../modals/onCelebrationXClicked";
import { onFacebookLoginFailure } from "../facebook/onFacebookLoginFailure";
import { updateState } from "../castleRisk/updateState";
import { Dictionary } from "lodash";
import { onDisplayHomeSnackbar } from "../homePage/onDisplayHomeSnackbar";
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
    onOrgSearchBarValueChange,
    onVolSearchBarValueChange,
    onSideNavCollapseRequested,
    onSideNavExpandRequested,
    onDisplayHomeSnackbar,
    updateState,
};
