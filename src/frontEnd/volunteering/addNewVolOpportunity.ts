import { addNewVolOpportunityToData } from './addNewVolOpportunityToData';

export const addNewVolOpportunity = (currentUser, creatorEmail) => {
    if (currentUser === creatorEmail || 'localdev@heartpoints.org') {
        addNewVolOpportunityToData();
    }else {
        alert('${currentUser} is not authorized to add job for this organization.')
    }
};