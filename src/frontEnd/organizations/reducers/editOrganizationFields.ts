import { mapProperties } from "../../../utils/list/mapProperties";
import { generalOrgFields } from "./generalOrgFields";
import { nestedOrgField } from "./nestedOrgField";

//todo: kill the any
export const editOrganizationFields = 
    (matchingHref:string):any => 
    mapProperties(
        generalOrgFields,
        nestedOrgField(matchingHref)
    )