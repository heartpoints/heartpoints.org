import * as React from 'react';
import { fieldSetChildStyle } from './fieldSetChildStyle';
import { textChangeHandler } from "./textChangeHandler";

export const TextAreaForField = 
    ({ value, setValue, placeholder }) => 
    <textarea 
        style={fieldSetChildStyle} 
        rows={5} 
        cols={50} 
        {...{ placeholder, value, onChange: textChangeHandler(setValue) }}
    />
