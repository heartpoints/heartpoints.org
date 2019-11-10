import { orgOppPairsForManyOrgs } from "./orgOppPairsForManyOrgs";
import { jobOrOrgTitleMatches } from "./jobOrOrgTitleMatches";
export const orgOppPairsMatchingSoughtText = (soughtText: string, organizations) => orgOppPairsForManyOrgs(organizations).where(jobOrOrgTitleMatches(soughtText));
