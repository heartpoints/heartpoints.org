import { navTo } from "../../nav/navTo";
import { initialOrganization } from "../data/initialOrganization";

export const addNewOrganization = (state, creatorEmail) => {
    const { organizations, possibleNewOrganization } = state;
    const href = `/organizations/${organizations.length + 1}`;
    const newOrganization = {
        ...possibleNewOrganization,
        href,
        creatorEmail,
        volOpportunities: []
    };
    const stateWithNewOrg = {
        ...state,
        organizations: [...state.organizations, newOrganization],
        possibleNewOrganization: initialOrganization(),
    };
    return navTo(stateWithNewOrg, href);
};
