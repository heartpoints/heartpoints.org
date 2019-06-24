import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list";
import { generalOrgFields } from "./generalOrgFields";

export const newOrganizationFields = () => {
    const possibleNewOrganizationField = nestedFieldNamed("possibleNewOrganization")
    return mapProperties(generalOrgFields, possibleNewOrganizationField)
}