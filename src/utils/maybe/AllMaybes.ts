import { IMaybe } from "./IMaybe";
import { Maybes } from "./Maybes";
import { None } from "./None";
import { typesafeEntries } from "./typesafeEntries";
import { Some } from "./Some";

export type AllMaybes = <T>(maybes: Maybes<T>) => IMaybe<T>;

export const allMaybes:AllMaybes = 
    <T> (maybes: Maybes<T>) =>
    typesafeEntries(maybes).every(([key, value]) => value.hasValue) 
        ? Some(typesafeEntries(maybes).reduce(
            (obj, [key, value]) => ({...obj, [key]: value.value}),
            {}
        ) as any as T)
        : None