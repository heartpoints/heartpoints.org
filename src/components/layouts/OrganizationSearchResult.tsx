import * as React from "react";

export interface IOrganizationSearchResult {
    title: string,
    imageThumbnailURL: string,
    statement: string
}

export const headerContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px 0px"
}

export const statementStyle = {
    "font-size": "12px",
    "color": "#888",
    "font-style": "italic",
    "padding-left": "60px"
}

export const OrganizationSearchResult = (props:IOrganizationSearchResult) => {

    const determineLengthOfStatementToDisplay = () => {
        const statement = props.statement;
        const statementLength = statement.length;

        return statementLength > 125 ? statement.slice(0, 122) + "..." : statement;
    }

   
    return(
        <div>
            <div>
                <img style={headerContainerChildStyle} src={props.imageThumbnailURL} />
                <h3 style={headerContainerChildStyle}>{props.title}</h3>
            </div>
            <div>
                <p style={statementStyle}>{determineLengthOfStatementToDisplay()}</p>
            </div>
        </div>
    )

}