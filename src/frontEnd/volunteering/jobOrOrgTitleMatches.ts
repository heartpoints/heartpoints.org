import { OrgOpportunityPair } from "./OrgOpportunityPair";
import { orgTitleMatches } from "./orgTitleMatches";
import { jobTitleMatches } from "./jobTitleMatches";
export const jobOrOrgTitleMatches = (soughtText: string) => ([org, opp]: OrgOpportunityPair): boolean => orgTitleMatches(org, soughtText) || jobTitleMatches(opp, soughtText);
