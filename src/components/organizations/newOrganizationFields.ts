import { lazyField } from "../forms/lazyField";
import { lazyFieldNamed } from "../forms/lazyFieldNamed";
import { nestedField } from "../forms/nestedField";
import { nestedFieldNamed } from "../forms/nestedFieldNamed";
import { mapProperties } from "../../utils/list";

export const newOrganizationFields = () => {
    const possibleNewOrganizationField = nestedFieldNamed("possibleNewOrganization")

    const orgFields = {
        title: lazyFieldNamed("title", "Organization Title"),
        homepage: lazyFieldNamed("homepage", "Organization Home Page"),
        mission: lazyFieldNamed("mission", "Mission Statement / Summary"),
    }
    
    return mapProperties(orgFields, possibleNewOrganizationField)
}