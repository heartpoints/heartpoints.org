import * as React from "react";
import { SearchBar as VolSearchBar } from "./SearchBar";
import { Router } from "../nav/Router";
import { regexMatch } from "../../utils/strings/regexMatch";
import {ViewVolunteeringOption} from "./ViewVolunteeringOption";
import { CreateVolOpportunity } from "./CreateVolOpportunity";
import { LoadFullVolOpportunityForm } from "./LoadFullVolOpportunityForm";

export const VolRoutes = (url, props, router:Router) => 
    router
        .case("/volunteering/search", <VolSearchBar {...props} />)
        .case("/volunteering/new", <CreateVolOpportunity {...props} />)
        .matches(regexMatch("/volunteering/(.+)"), <ViewVolunteeringOption {...props} />)