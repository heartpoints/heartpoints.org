import React from 'react';
import { Page } from '../page/Page';
import  { LoadVolunteeringOption } from "./LoadVolunteeringOption";
import { List } from "../../utils/list/List";


export const ViewVolunteeringOption = ({url, organizations, navTo}) => {
    const selectedJobID = (url.path).substring(14);
// alternative of filtering data again : if we can upsate state to have selected data when 
// onSuggestionSelected is called, so that we can directly use it to load next page.
    const selectedData = organizations.map(org => {
        const selectedItem = org.volOpportunities.find(opp => opp.jobID === selectedJobID )
        if (selectedItem !== undefined) {
            return ({...org, volOpportunities:'', ...selectedItem});
        }
    });

    const flattenedData = selectedData.filter(object => object != null || undefined);
    console.log(flattenedData);
    
    return(
        <LoadVolunteeringOption {...{...flattenedData[0], navTo}} />
    );
}