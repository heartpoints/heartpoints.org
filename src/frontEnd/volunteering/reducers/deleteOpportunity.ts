import { navTo } from "../../nav/navTo";
import { Organizations } from "../../organizations/data/Organizations";

export const deleteOpportunity = (state, jobTitle, jobID) => {
    const orgs:Organizations = state.organizations;
    const updatedState = {
        ...state,
        organizations: orgs.map(o => ({
            ...o,
            volOpportunities: o.volOpportunities.filter(v => v.jobID != jobID)
        })),
        shouldShowSnackbar: true,
        snackbarText: `${jobTitle} Deleted`,
    }

    return navTo(updatedState, "/");
}