import * as React from "react";
import { NotFound } from "./NotFound";
import { allRoutesSwitch } from "./allRoutesSwitch";

export const CurrentRoute = 
  (url, props) => 
  allRoutesSwitch(url, props)
    .result
    .valueOrDefault(<NotFound />);