import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list";
import { generalOrgFields } from "./generalOrgFields";

export const newOrganizationFields = 
    () =>
    mapProperties(
        generalOrgFields,
        nestedFieldNamed("possibleNewOrganization")
    )