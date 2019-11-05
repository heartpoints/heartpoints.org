import { OrgOpportunityPair } from './OrgOpportunityPair';
import { CombinedOrgAndVolOpportunity } from './CombinedOrgAndVolOpportunity';

export const combineOrgOppPairToSinglePropsObject = 
    ([org, opp]: OrgOpportunityPair):CombinedOrgAndVolOpportunity => 
    ({ ...org, ...opp })
