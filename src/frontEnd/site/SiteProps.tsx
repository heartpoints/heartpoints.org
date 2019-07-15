import { WithOrganizations } from "../organizations/data/WithOrganizations"
import { WithUrl } from "../../utils/url/WithUrl";
import { WithUnknownProperties } from "../state/WithUnknownProperties";
import { WithNavTo } from "../nav/WithNavTo";

export type SiteProps = WithOrganizations & WithUrl & WithUnknownProperties & WithNavTo
