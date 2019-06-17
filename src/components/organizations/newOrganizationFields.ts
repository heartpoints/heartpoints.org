import { field } from "../forms/field";
import { fieldNamed } from "../forms/fieldNamed";
import { nestedField } from "../forms/nestedField";
import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list";

export const newOrganizationFields = () => {
    const possibleNewOrganizationField = nestedFieldNamed("possibleNewOrganization")

    const orgFields = {
        title: fieldNamed("title", "Organization Title"),
        homepage: fieldNamed("homepage", "Organization Home Page"),
        mission: fieldNamed("mission", "Mission Statement / Summary"),
        imageThumbnailURL: fieldNamed("imageThumbnailURL", "Organization Logo"),
    }
    
    return mapProperties(orgFields, possibleNewOrganizationField)
}