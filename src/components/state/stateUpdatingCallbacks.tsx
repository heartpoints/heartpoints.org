import { onFacebookLoginComplete } from "../facebook/onFacebookLoginComplete";
import { navTo } from "../nav/navTo";
import { onLogoutRequested } from "../facebook/onLogoutRequested";
import { onHamburgerClicked } from "../nav/onHamburgerClicked";
import { onSideNavExpandRequested } from "../nav/onSideNavExpandRequested";
import { onSideNavCollapseRequested } from "../nav/onSideNavCollapseRequested";
import { onSearchBarValueChange } from "../search/onSearchBarValueChange";
import { onCelebrationXClicked } from "../modals/onCelebrationXClicked";
import { updateNewOrgTitle } from "../organizations/updateNewOrgTitle";
import { updateNewOrgMission } from "../organizations/updateNewOrgMission";
import { updateNewOrgUrl } from "../organizations/updateNewOrgUrl";
import { updateNewOrgLogo } from "../organizations/updateNewOrgLogo";
import { addNewOrganization } from "../organizations/addNewOrganization";
import { onFacebookLoginFailure } from "../facebook/onFacebookLoginFailure";
import { updateState } from "../castleRisk/updateState";
import { Dictionary } from "lodash";

type StateUpdatingCallback = (state:any, ...args:any[]) => any

export const stateUpdatingCallbacks:Dictionary<StateUpdatingCallback> = {
    addNewOrganization,
    navTo,
    onCelebrationXClicked,
    onFacebookLoginComplete,
    onFacebookLoginFailure,
    onHamburgerClicked,
    onLogoutRequested,
    onSearchBarValueChange,
    onSideNavCollapseRequested,
    onSideNavExpandRequested,
    updateNewOrgLogo,
    updateNewOrgMission,
    updateNewOrgTitle,
    updateNewOrgUrl,
    updateState,
};
