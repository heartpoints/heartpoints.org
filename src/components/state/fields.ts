import { organizationFields } from "../organizations/organizationFields";
import { mapProperties } from "../../utils/list";

export const fields = 
    (state, renderApp) => 
    ({
        ...mapProperties(organizationFields(), field => field(state, renderApp))
    })

