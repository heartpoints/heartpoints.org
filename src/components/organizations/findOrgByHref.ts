import { List } from "../../utils/list/List";
import { Organization } from './organization';

export function findOrgByHref(organizations: Organization[], href: string) {
    return List(organizations).first(o => o.href == href);
}
