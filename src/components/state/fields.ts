import { newOrgFields } from "../organizations/newOrgFields";

export const fields = state => {
    return { 
        ...newOrgFields(state)
    };
};

