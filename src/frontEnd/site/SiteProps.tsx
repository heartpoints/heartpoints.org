import { IUrl } from "../../utils/url/IUrl";
import { Organization } from "../organizations/organization";

export type SiteProps = {
  url: IUrl;
  organizations: Organization[];
  [others: string]: any;
  navTo;
};
