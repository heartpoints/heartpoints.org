import { nestedField } from "./nestedField";
import { Predicate } from "../../../utils/predicates/Predicate";

export const nestedFieldInArray = 
    <S>(propertyNameOfArray: string, elementMatcher: Predicate<unknown>) => 
    nestedField(
        (s: S) => s[propertyNameOfArray].filter(elementMatcher)[0], 
        (s, v) => ({
            ...s,
            [propertyNameOfArray]: [
                ...s[propertyNameOfArray].filter(o => !elementMatcher(o)),
                v
            ]
        }))

// type ArrayPropertyNames<T, X> = { [K in keyof T]: T[K] extends Array<X> ? K : never }[keyof T]
// type ArrayProperties<T, X> = Pick<T, ArrayPropertyNames<T, X>>