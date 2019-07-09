import { withStyles } from "@material-ui/core";
import { rootStyles } from "./rootStyles";
import { SiteWithoutStyle } from "./SiteWithoutStyle";

export const Site = withStyles(rootStyles)(SiteWithoutStyle);
