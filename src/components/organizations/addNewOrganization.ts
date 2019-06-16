import { navTo } from "../nav/navTo";
import { tap } from "../../utils/tap";

export const addNewOrganization = (state, creatorEmail) => {
    const { organizations } = state;
    const href = `/organizations/${organizations.length + 1}`;
    const newOrganization = {
        href,
        imageThumbnailURL: state.newOrgLogo && state.newOrgLogo.src,
        title: state.newOrgTitle,
        statement: state.newOrgMission,
        organizationURL: state.newOrgUrl,
        creatorEmail,
    };
    const stateWithNewOrg = {
        ...state,
        organizations: [...state.organizations, newOrganization],
        newOrgTitle: '',
        newOrgMission: '',
        newOrgUrl: '',
        newOrgLogo: [],
    };
    return navTo(stateWithNewOrg, href);
};
