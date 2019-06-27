import { mapProperties } from "../../utils/list/mapProperties";
import { generalOrgFields } from "./generalOrgFields";
import { nestedFieldInArray } from "../forms/nestedFieldInArray";

export const editOrganizationFields = 
    matchingHref => 
    mapProperties(
        generalOrgFields,
        nestedFieldInArray(
            "organizations",
            (o: any) => o.href == matchingHref)
        );
