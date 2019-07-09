import * as React from 'react';
import { InputForField } from './InputForField';

export const TextAreaForField = 
    props => 
    <InputForField {...props} multiline={true} rows={6} />
