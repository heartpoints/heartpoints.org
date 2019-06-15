import { updateNewOrgTitle } from "./updateNewOrgTitle";
import { updateNewOrgMission } from "./updateNewOrgMission";
import { updateNewOrgLogo } from "./updateNewOrgLogo";
import { updateNewOrgUrl } from "./updateNewOrgUrl";
import { addNewOrganization } from "./addNewOrganization";

export const orgCallbacks = () => ({
    addNewOrganization,
    updateNewOrgLogo,
    updateNewOrgMission,
    updateNewOrgTitle,
    updateNewOrgUrl,
})