import * as React from "react";
import { Fragment } from "react";
import { ellipsis } from "../../utils/ellipsis";

export const headerContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px 0px"
}

export const padLeft = {
    "paddingLeft": "60px"
}

export const statementStyle = {
    "font-size": "12px",
    "color": "#888",
    "font-style": "italic",
    ...padLeft,
}

export const urlStyle ={
    "font-size": "15px",
    "color": "#99bdf7",
    "font-style": "italic",
    "padding-left": "60px"
}

export const imageStyle = {
    "width": "50px",
    "height": "50px",
    ...headerContainerChildStyle,
}

const maxStatementLength = 125;

export const HPSearchResult = ({imageThumbnailURL, title, statement, subtitle = undefined, organizationURL = undefined}) => {
    return  <Fragment>
        <div style={{display: "inline"}}>
            <img style={imageStyle} src={imageThumbnailURL} />
            <h3 style={headerContainerChildStyle}>{title}</h3>
        </div>
        <div>
            {subtitle && <h5 style={padLeft}>{subtitle}</h5>}
            {organizationURL && <a onClick={e => e.stopPropagation() } style ={urlStyle} href={organizationURL} target="_blank">{organizationURL}</a>}
            <p style={statementStyle}>{ellipsis(statement, maxStatementLength)}</p>
        </div>
    </Fragment>
}


