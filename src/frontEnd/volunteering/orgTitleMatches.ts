import { Organization } from "../organizations/data/organization";
import { trimmedLowercase } from "../../utils/strings/trimmedLowercase";
export const orgTitleMatches = (org: Organization, title: string) => trimmedLowercase(org.title).includes(trimmedLowercase(title));
