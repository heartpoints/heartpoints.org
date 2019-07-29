import { generalOrgFields } from "./generalOrgFields";
import { possibleNewOrganization } from "./possibleNewOrganization";
import { mapProperties } from "../../../utils/list/mapProperties";

export const newOrganizationFields = 
    () =>
    mapProperties(
        generalOrgFields,
        possibleNewOrganization
    )
