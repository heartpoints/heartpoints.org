import { initialOrganization } from "./initialOrganization";
import { defaultOrganizations } from "./defaultOrganizations";

export const initialOrgsState = () => ({
    possibleNewOrganization: initialOrganization(),
    organizations: defaultOrganizations,
})