import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list";
import { generalOrgFields } from "./generalOrgFields";
import { Mapper } from "../../utils/mapper";
import { nestedFieldInArray } from "../forms/nestedFieldInArray";

// export const newOrganizationFields = 
//     () =>
//     mapProperties(
//         generalOrgFields,
//         nestedFieldNamed("possibleNewOrganization")
//     )

// export const newOrganizationFields = 
//     () =>
//     mapProperties(
//         generalOrgFields,
//         nestedField(
//             (s:any) => s.organizations.filter(o => o.href == "/organizations/2")[0],
//             (s, v) => ({ ...s, organizations: [ ...s.organizations.filter(o => o.href != "/organizations/2"), v]})
//         )
//     )

export const newOrganizationFields = 
    () =>
    mapProperties(
        generalOrgFields,
        nestedFieldInArray("organizations", (o:any) => o.href == "/organizations/2")
    )

