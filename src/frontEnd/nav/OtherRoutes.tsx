import * as React from "react";
import { HomePage } from "../homePage/HomePage";
import { SearchBar as VolunteeringSearchBar } from "../volunteering/SearchBar";
import { CastleRisk } from "../castleRisk/CastleRisk";
import { Router } from "./Router";
import { RestGuru } from "../RestGuru/RestGuru";
import { FacebookLoginLogout } from "../facebook/FacebookLoginLogout";

export const OtherRoutes = (url, props, router: Router) => router
  .case("/", <HomePage />)
  .case("/dev", <FacebookLoginLogout {...props} />)
  .case("/castleRisk", <CastleRisk {...props.castleRisk} {...props} />)
  .case("/rest-guru", <RestGuru {...props} />)
  .case("/volunteering/search", <VolunteeringSearchBar {...props} />);
