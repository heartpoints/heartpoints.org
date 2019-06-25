import { mapProperties } from "../../utils/list";
import { generalOrgFields } from "./generalOrgFields";
import { nestedFieldInArray } from "../forms/nestedFieldInArray";

export const editOrganizationFields = 
    () => 
    mapProperties(
        generalOrgFields,
        nestedFieldInArray(
            "organizations",
            (o: any) => o.href == "/organizations/2")
        );
