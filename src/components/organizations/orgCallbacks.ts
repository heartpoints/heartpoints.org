import { updateNewOrgMission } from "./updateNewOrgMission";
import { updateNewOrgLogo } from "./updateNewOrgLogo";
import { updateNewHomepage } from "./updateNewHomepage";
import { addNewOrganization } from "./addNewOrganization";

export const orgCallbacks = () => ({
    addNewOrganization,
    updateNewOrgLogo,
    updateNewOrgMission,
    updateNewHomepage,
})