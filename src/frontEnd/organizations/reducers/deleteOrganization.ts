import { Organizations } from "../data/Organizations";

export const deleteOrganization = (state, organizationToDelete) => {
    const orgs:Organizations = state.organizations;
    const orgsWithSpecifiedOrgDeleted = orgs.filter((org) => org.href != organizationToDelete);
    return{
        ...state,
        organizations: orgsWithSpecifiedOrgDeleted
    };
};