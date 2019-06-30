import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list/mapProperties";
import { generalOrgFields } from "./generalOrgFields";
import { Organization } from "./organization";
import { FieldBinderTransformer } from "../forms/FieldBinderTransformer";

export type HasPossibleNewOrganization = {
    possibleNewOrganization: Organization
}

// export const newOrganizationFields = 
//     () =>
//     mapProperties(
//         generalOrgFields,
//         nestedFieldNamed<HasPossibleNewOrganization, "possibleNewOrganization">("possibleNewOrganization")
//     )

const possibleNewOrganization: FieldBinderTransformer<HasPossibleNewOrganization, Organization, string>  = nestedFieldNamed("possibleNewOrganization")

export const title = possibleNewOrganization(generalOrgFields.title)
export const homepage = possibleNewOrganization(generalOrgFields.homepage)
export const mission = possibleNewOrganization(generalOrgFields.mission)
export const imageThumbnailURL = possibleNewOrganization(generalOrgFields.imageThumbnailURL)

export const newOrganizationFields = 
    () =>
    ({
        title,
        homepage,
        mission,
        imageThumbnailURL,
    })
