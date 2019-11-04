import React from 'react';
import  { LoadVolunteeringOption } from "./LoadVolunteeringOption";
import { Organizations } from '../organizations/data/Organizations';
import { WithNavTo } from '../nav/WithNavTo';
import { WithUrl } from '../../utils/url/WithUrl';
import { NotFound } from '../nav/NotFound';
import { findOrgOpportunityPairByJobId } from './findOrgOpportunityPairByJobId';
import { combineOrgOppPairToSinglePropsObject } from './combineOrgOppPairToSinglePropsObject';

type ViewVolunteeringOptionProps = { organizations: Organizations } & WithNavTo & WithUrl
export const ViewVolunteeringOption = ({url, organizations, navTo}:ViewVolunteeringOptionProps) => {
    const selectedJobID = (url.path).substring(14);
    const possiblyMatchingOrgVolPair = findOrgOpportunityPairByJobId(organizations, selectedJobID)
    const combinedPropsForMatch = possiblyMatchingOrgVolPair.map(combineOrgOppPairToSinglePropsObject)
    return combinedPropsForMatch.mapOrDefault(
        combinedProps => <LoadVolunteeringOption {...combinedProps} {...{navTo}} />,
        <NotFound />
    )
}