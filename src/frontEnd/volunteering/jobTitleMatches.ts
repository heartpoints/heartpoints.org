import { VolOpportunity } from "../organizations/data/organization";
import { trimmedLowercase } from "../../utils/strings/trimmedLowercase";
export const jobTitleMatches = (opp: VolOpportunity, title: string) => trimmedLowercase(opp.jobTitle).includes(trimmedLowercase(title));
