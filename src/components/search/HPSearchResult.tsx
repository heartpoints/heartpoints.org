import * as React from "react";
import { Fragment } from "react";
import { ellipsis } from "../../utils/ellipsis";

const headerContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px 0px"
}

const padLeft = {
    "paddingLeft": "60px"
}

const statementStyle = {
    "font-size": "12px",
    "color": "#888",
    "font-style": "italic",
    ...padLeft,
}

const maxStatementLength = 125;

export const HPSearchResult = ({imageThumbnailURL, title, statement, subtitle = undefined}) =>
    <Fragment>
        <div>
            <img style={headerContainerChildStyle} src={imageThumbnailURL} />
            <h3 style={headerContainerChildStyle}>{title}</h3>
        </div>
        <div>
            {subtitle && <h5 style={padLeft}>{subtitle}</h5>}
            <p style={statementStyle}>{ellipsis(statement, maxStatementLength)}</p>
        </div>
    </Fragment>