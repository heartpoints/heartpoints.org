import { mapProperties } from "../../../utils/list/mapProperties";
import { generalOrgFields } from "./generalOrgFields";
import { nestedFieldInArray } from "../../state/fields/nestedFieldInArray";

//todo: kill the any
export const editOrganizationFields = 
    (matchingHref:string):any => 
    mapProperties(
        generalOrgFields,
        nestedOrgField(matchingHref)
    )

export const nestedOrgField = 
    (matchingHref:string) => 
    nestedFieldInArray(
        "organizations",
        (o: any) => o.href == matchingHref
    )