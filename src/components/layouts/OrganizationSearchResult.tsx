import * as React from "react";

export interface IOrganizationSearchResult {
    title: string,
    imageThumbnailURL: string,
    orgURL: string
}

export const suggestionContainerChildStyle = {
    "display": "inline",
    "margin": "3px 10px 3px 0px"
}

export const OrganizationSearchResult = (props:IOrganizationSearchResult) => {
    return(
        <div>
            <img style={suggestionContainerChildStyle} src={props.imageThumbnailURL} />
            <h4 style={suggestionContainerChildStyle}>{props.title}</h4>
            <a style={suggestionContainerChildStyle} href={props.orgURL}>{props.orgURL}</a>
        </div>
    )
}