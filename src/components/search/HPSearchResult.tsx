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
    "fontSize": "12px",
    "color": "#888",
    "fontStyle": "italic",
    ...padLeft,
}

export const urlStyle ={
    "fontSize": "15px",
    "color": "#99bdf7",
    "fontStyle": "italic",
    "paddingLeft": "60px"
}

export const imageStyle = {
    "width": "50px",
    "height": "50px",
    ...headerContainerChildStyle,
}

const maxStatementLength = 125;

export const HPSearchResult = ({imageThumbnailURL, title, statement, subtitle = undefined, homepage = undefined}) => {
    return  <Fragment>
        <div style={{display: "inline"}}>
            <img style={imageStyle} src={imageThumbnailURL} />
            <h3 style={headerContainerChildStyle}>{title}</h3>
        </div>
        <div>
            {subtitle && <h5 style={padLeft}>{subtitle}</h5>}
            {homepage && <a onClick={e => e.stopPropagation() } style ={urlStyle} href={homepage} target="_blank">{homepage}</a>}
            <p style={statementStyle}>{ellipsis(statement, maxStatementLength)}</p>
        </div>
    </Fragment>
}


