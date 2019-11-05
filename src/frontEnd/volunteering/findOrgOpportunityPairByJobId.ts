import { Organizations } from '../organizations/data/Organizations';
import { orgOppPairsForManyOrgs } from "./orgOppPairsForManyOrgs";

export const findOrgOpportunityPairByJobId = 
    (orgs: Organizations, soughtJobId: string) => 
    orgOppPairsForManyOrgs(orgs).first(([org, volOpp]) => volOpp.jobID == soughtJobId)
