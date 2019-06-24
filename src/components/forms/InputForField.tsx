import * as React from 'react';
import { fieldSetChildStyle } from './fieldSetChildStyle';
import { textChangeHandler } from "./textChangeHandler";

export const InputForField = 
    ({ value, setValue, placeholder }) => 
    <input style={fieldSetChildStyle} 
        type="text" 
        {...{ 
            value: value === undefined || value === null ? "" : value, 
            onChange: textChangeHandler(setValue),
            placeholder 
        }} 
    />
