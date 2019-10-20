import * as React from "react";
import { Page } from "./Page";
import { Overlay } from "./Overlay";

export interface IComponentWithOverlayProps {
    children: React.ReactNode,
    bgColor: string
}

export const contentToBeHighlightedStyle:React.CSSProperties = {
    "display": "inline-block",
    "position": "relative",
    "left": "0px",
    "top": "0px",
    "zIndex": 1001,

}

export const ComponentWithOverlay = ({children, bgColor}:IComponentWithOverlayProps) => {
    return <React.Fragment>
        <div style={{backgroundColor: bgColor, ...contentToBeHighlightedStyle}}>
            {children}
        </div>
        <Overlay z={1000} />
    </React.Fragment>
}