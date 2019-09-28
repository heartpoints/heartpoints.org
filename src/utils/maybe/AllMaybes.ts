import { IMaybe } from "./IMaybe";
import { Maybes } from "./Maybes";
import { None } from "./None";
import { typesafeEntries } from "./typesafeEntries";
export type AllMaybes = <T>(maybes: Maybes<T>) => IMaybe<T>;

export const allMaybes:AllMaybes = <T> (maybes) => typesafeEntries(maybes).reduce(
    (totalMaybe, [property, maybeValue]) => 
    maybeValue.map(
        actualValue => ({...totalMaybe, [property]: actualValue })
    ),
    None as IMaybe<T>
)