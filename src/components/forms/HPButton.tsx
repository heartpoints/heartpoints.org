import * as React from 'react';
import { submitButtonStyle } from './submitButtonStyle';
import { fieldSetChildStyle } from './fieldSetChildStyle';

export const HPButton = ({ onClick, label }) => {
    const style = { ...fieldSetChildStyle, ...submitButtonStyle };
    const props = { style, onClick };
    return <button {...props}>{label}</button>;
};
