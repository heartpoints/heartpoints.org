import React from 'react';
import { Page } from '../page/Page';
import  { LoadVolunteeringOption } from "./LoadVolunteeringOption";
import { strict } from 'assert';


export const ViewVolunteeringOption = ({url, volOpportunities, navTo}) => {
    const selectedJobID = (url.path).substring(14);

    const data = volOpportunities.filter(function(item) {
        return item.jobID == selectedJobID;
    });

    return(
        <LoadVolunteeringOption {...{...data[0], navTo}} />
    );
}