import * as React from "react"
import { logoStyle } from "../logoStyle";
import { ImagePicker } from "../ImagePicker";

export const Image = ({isEditMode, field, style = {} }) => 
    field && isEditMode  
        ? <ImagePicker {...{style, field}} />
        : <img style={logoStyle} src={field.value} />