import * as React from "react";
import { SearchBar as OrgSearchBar } from "./SearchBar";
import { ViewOrganization } from "./ViewOrganization";
import { CreateOrganization } from "./CreateOrganization";
import { EditOrganization } from "./EditOrganization";
import { Router } from "../nav/Router";
import { regexMatch } from "../../utils/strings/regexMatch";

export const OrgRoutes = (url, props, router:Router) => 
    router
        .case("/organizations/search", <OrgSearchBar {...props} />)
        .case("/organizations/new", <CreateOrganization {...props} />)
        .matches(regexMatch("/organizations/.+/edit"), <EditOrganization href={url.path} {...props} />)
        .matches(regexMatch("/organizations/.+"), <ViewOrganization href={url.path} {...props} />)