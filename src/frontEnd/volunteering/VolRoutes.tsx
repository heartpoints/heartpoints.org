import * as React from "react";
import { SearchBar as VolSearchBar } from "./SearchBar";
import { Router } from "../nav/Router";
import { regexMatch } from "../../utils/strings/regexMatch";
import {ViewVolunteeringOption} from "./ViewVolunteeringOption";

export const VolRoutes = (url, props, router:Router) => 
    router
        .case("/volunteering/search", <VolSearchBar {...props} />)
        .matches(regexMatch("/volunteering/(.+)"), <ViewVolunteeringOption {...props} />)