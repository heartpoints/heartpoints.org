import * as React from "react"
import { Site } from "../../site/Site"
import { sitePropsForState } from "../react/sitePropsForState"

export const renderedSiteForState = state => <Site {...sitePropsForState(state)} />