import { nestedField } from "./nestedField";
import { Predicate } from "../../utils/predicate";

export const nestedFieldInArray = 
    (propertyNameOfArray: string, elementMatcher: Predicate<unknown>) => 
    nestedField(
        (s: any) => s[propertyNameOfArray].filter(elementMatcher)[0], 
        (s, v) => ({
            ...s,
            [propertyNameOfArray]: [
                ...s[propertyNameOfArray].filter(o => !elementMatcher(o)),
                v
            ]
        }))
