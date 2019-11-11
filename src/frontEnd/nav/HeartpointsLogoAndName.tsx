import * as React from "react";
import { Typography } from "@material-ui/core";

const logoStyle = {
    width: "2.5em",
    margin: ".75em",
    cursor: "pointer",
}

export const HeartpointsLogoAndName = ({ typographyClass, navTo }) => <React.Fragment>
  <img style={logoStyle} src="/images/hand-with-heart.png" onClick={() => navTo("/")} />
  <Typography style={{cursor: "pointer"}} variant="h5" color="inherit" className={typographyClass} onClick={() => navTo("/")}>
    heartpoints.org
  </Typography>
</React.Fragment>
