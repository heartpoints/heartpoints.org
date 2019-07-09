import { IUrl } from "../../utils/url/IUrl";
import { Organization } from "../organizations/data/organization";

export type SiteProps = {
  url: IUrl;
  organizations: Organization[];
  [others: string]: any;
  navTo;
};
