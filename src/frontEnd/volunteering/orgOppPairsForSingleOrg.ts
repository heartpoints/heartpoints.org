import { List } from "../../utils/list/List";
import { Organization } from '../organizations/data/organization';
import { OrgOppPairs } from './OrgOppPairs';

export const orgOppPairsForSingleOrg: OrgOppPairs = 
    (org: Organization) => List(org.volOpportunities).map(v => [org, v])
