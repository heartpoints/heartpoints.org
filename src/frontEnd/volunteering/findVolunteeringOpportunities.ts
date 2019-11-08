import { combineOrgOppPairToSinglePropsObject } from "./combineOrgOppPairToSinglePropsObject";
import { orgOppPairsMatchingSoughtText } from "./orgOppPairsMatchingSoughtText";
import { CombinedOrgAndVolOpportunity } from "./CombinedOrgAndVolOpportunity";
import { isEmptyOrWhitespaceOnlyString } from "../../utils/strings/isEmptyOrWhitespaceOnlyString";

export const findVolunteeringOpportunities = 
    (orgOrJobTitle:string = "", organizations):CombinedOrgAndVolOpportunity[] => 
    isEmptyOrWhitespaceOnlyString(orgOrJobTitle)
        ? []
        : orgOppPairsMatchingSoughtText(orgOrJobTitle, organizations).map(combineOrgOppPairToSinglePropsObject).asArray