import { defaultOrganizations } from "../organizations/data/defaultOrganizations";
import { orgOppPairsForManyOrgs } from "./orgOppPairsForManyOrgs";
import { jobOrOrgTitleMatches } from "./jobOrOrgTitleMatches";
export const orgOppPairsMatchingSoughtText = (soughtText: string) => orgOppPairsForManyOrgs(defaultOrganizations).where(jobOrOrgTitleMatches(soughtText));
