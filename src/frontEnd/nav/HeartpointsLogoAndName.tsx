import * as React from "react";
import { Typography } from "@material-ui/core";
import { isMobile } from "../site/isMobile";
import { ThemeStyle } from "@material-ui/core/styles/createTypography";

export const HeartpointsLogoAndName = ({ typographyClass, navTo }) => {
  const {nameVariant, logoWidth, logoMargin} = isMobile()
    ? {nameVariant: "subtitle1", logoWidth: "10vw", logoMargin: "1vw"}
    : {nameVariant: "h5", logoWidth: "35px", logoMargin: "12px 10px"}

  const logoStyle = {
    width: logoWidth,
    margin: logoMargin,
    cursor: "pointer",
  }

  return <React.Fragment>
    <img style={logoStyle} src="/images/hand-with-heart.png" onClick={() => navTo("/")} />
    <Typography style={{cursor: "pointer"}} variant={nameVariant as ThemeStyle} color="inherit" className={typographyClass} onClick={() => navTo("/")}>
      heartpoints.org
    </Typography>
  </React.Fragment>
} 
