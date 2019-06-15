import { onFacebookLoginComplete } from "./models/onFacebookLoginComplete";
import { navTo } from "./models/navTo";
import { navigateToSimpleModel } from "./navigateToSimpleModel";
import { onLogoutRequested } from "./onLogoutRequested";
import { onHamburgerClicked } from "./onHamburgerClicked";
import { onSideNavExpandRequested } from "./onSideNavExpandRequested";
import { onSideNavCollapseRequested } from "./onSideNavCollapseRequested";
import { onSearchBarValueChange } from "./onSearchBarValueChange";
import { onCelebrationXClicked } from "./onCelebrationXClicked";
import { updateNewOrgTitle } from "./updateNewOrgTitle";
import { updateNewOrgMission } from "./updateNewOrgMission";
import { updateNewOrgUrl } from "./updateNewOrgUrl";
import { updateNewOrgLogo } from "./updateNewOrgLogo";
import { addNewOrganization } from "./components/organizations/addNewOrganization";
import { onFacebookLoginFailure } from "./onFacebookLoginFailure";
import { updateState } from "./updateState";

export const actionables = {
    addNewOrganization,
    navTo,
    navigateToSimpleModel,
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
