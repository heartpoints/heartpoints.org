import { possibleArray } from "./possibleArray"

export const possibleArrayElement = <T>(condition: boolean, element: T) =>
    possibleArray(condition, [element])
