import * as React from "react";

export interface IOrganizationSearchResult {
    title: string,
    imageThumbnailURL: string,
    orgURL: string
}

export const suggestionContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px"
}

export const suggestionContainerStyle = {
    "border": "1px solid black",
    "border-radius": "5px",
    "background-color": "#e9e9e9",
    "margin": "0 3px",
    "cursor": "pointer"
}

export const OrganizationSearchResult = (props:IOrganizationSearchResult) => {
    return(
        <div>
            <img style={suggestionContainerChildStyle} src={props.imageThumbnailURL} />
            <h3 style={suggestionContainerChildStyle}>{props.title}</h3>
            <a style={suggestionContainerChildStyle} href={props.orgURL}>{props.orgURL}</a>
        </div>
    )
}