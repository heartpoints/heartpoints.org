import { navTo } from "../../nav/navTo";
import { Organizations } from "../../organizations/data/Organizations";
import { Organization } from "../../organizations/data/organization";

export const deleteOpportunity = (state, href, jobTitle) => {
    const orgs:Organizations = state.organizations;

    const orgWithOpportunityToDelete = orgs.find((org) => org.href == href);
    if(!orgWithOpportunityToDelete){
        throw new Error("Error")
    }

    const specifiedVolOpportunities = orgWithOpportunityToDelete.volOpportunities;
        
    const updatedOpportunities = specifiedVolOpportunities.filter((op) => op.jobTitle != jobTitle);

    const newOrgState = {
        ...state,
        organizations: [
            ...orgs,
            orgWithOpportunityToDelete.volOpportunities = updatedOpportunities
        ],
        shouldShowSnackbar: true,
        snackbarText: "Opportunity Deleted"
    };

    return navTo(newOrgState, "/");
}