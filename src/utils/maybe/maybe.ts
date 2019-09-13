import { None } from "./None"
import { Some } from "./Some"
import { IMaybe } from "./IMaybe"

export const maybe = 
    <T>(possiblyNullOrUndefinedValue?: T): IMaybe<T> => 
    possiblyNullOrUndefinedValue !== null && possiblyNullOrUndefinedValue !== undefined 
        ? Some(possiblyNullOrUndefinedValue) 
        : None
