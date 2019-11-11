import React from 'react';
import { addNewVolOpportunityToData } from './addNewVolOpportunityToData';

export const addNewVolOpportunity = (currentUser, creatorEmail) => {
    if (currentUser === creatorEmail) {
        addNewVolOpportunityToData();
    }else {
        alert('${currentUser} is not authorized to add job for this organization.')
    }
};