import { Organization } from '../organizations/data/organization';
import { OrgOpportunityPairs } from './OrgOpportunityPairs';

export type OrgOppPairs = (org: Organization) => OrgOpportunityPairs;
