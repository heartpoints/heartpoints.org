import * as React from "react";

import { HomePage } from "../homePage/HomePage";
import { SearchBar as VolunteeringSearchBar } from "../volunteering/SearchBar";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";
import { CastleRisk } from "../castleRisk/CastleRisk";
import { Router } from "./Router";

export const OtherRoutes = (url, props, router: Router) => router
  .case("/", <HomePage />)
  .case("/dev", <FacebookLoginLogout {...props} />)
  .case("/castleRisk", <CastleRisk {...props.castleRisk} {...props} />)
  .case("/volunteering/search", <VolunteeringSearchBar {...props} />);
