import * as React from "react";
import { Typography } from "@material-ui/core";

const logoStyle = {
    width: "35px",
    height: "21px",
    margin: "12px 10px",
    cursor: "pointer",
}

export const HeartpointsLogoAndName = ({ typographyClass, navTo }) => <React.Fragment>
  <img style={logoStyle} src="/images/hand-with-heart.png" onClick={() => navTo("/")} />
  <Typography style={{cursor: "pointer"}} variant="h4" color="inherit" className={typographyClass} onClick={() => navTo("/")}>
    heartpoints.org
  </Typography>
</React.Fragment>
