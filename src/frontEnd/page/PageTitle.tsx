import * as React from "react";
import { Typography } from "@material-ui/core";
import { isMobile } from "../site/isMobile";

export const PageTitle = ({children}) => {
    const headerVariant = () => isMobile() ? "subtitle2" : "h4"
    return <Typography variant={headerVariant()}>{children}</Typography>
}