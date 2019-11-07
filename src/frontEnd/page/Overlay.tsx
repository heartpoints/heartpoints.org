import React, { useState } from "react";

export const overlayStyle:React.CSSProperties = {
    "position": "absolute",
    "top": "0px",
    "left": "0px",
    "width": "100%",
    "height": "100%",
    "backgroundColor": "rgba(0,0,0,0.5)"
}

export interface IOverlayProps {
    z: number
}

export const Overlay = (props:IOverlayProps) => {
    const { z:zIndex } = props;
    return <div style={{zIndex, ...overlayStyle}}></div>
}