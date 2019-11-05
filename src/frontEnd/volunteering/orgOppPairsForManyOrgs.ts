import { List } from "../../utils/list/List";
import { Organizations } from '../organizations/data/Organizations';
import { orgOppPairsForSingleOrg } from './orgOppPairsForSingleOrg';

export const orgOppPairsForManyOrgs = (orgs: Organizations) => List(orgs).flatMap(orgOppPairsForSingleOrg);
