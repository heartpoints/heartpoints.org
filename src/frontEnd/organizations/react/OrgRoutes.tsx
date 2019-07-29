import * as React from "react";
import { SearchBar as OrgSearchBar } from "./SearchBar";
import { ViewOrganization } from "./ViewOrganization";
import { CreateOrganization } from "./CreateOrganization";
import { EditOrganization } from "./EditOrganization";
import { Router } from "../../nav/Router";
import { regexMatch } from "../../../utils/strings/regexMatch";
import { ViewOrEditOrganization } from "./ViewOrEditOrganization";

/*

I want to use DIP for every component, react or otherwise. I want the simplest possible
dependency to be passed in to my constructors or my react components.

Edit and View
-------------

I would like a single layout for viewing, and then the UI for each field offers a toggle
for editing, if the field is editable. There would not be an overall "edit" mode for all fields.
For this part, I will not be worrying about creating org.

*/

export const OrgRoutes = (url, props, router:Router) => 
    router
        .case("/organizations/search", <OrgSearchBar {...props} />)
        .case("/organizations/new", <CreateOrganization {...props} />)
        // .matches(regexMatch("/organizations/.+/edit"), <EditOrganization {...props} />)
        .matches(regexMatch("/organizations/.+"), <ViewOrEditOrganization {...props} />)