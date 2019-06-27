import { TypePredicate } from "../predicates/TypePredicate";
import { Some } from "../maybe/Some";
import { None } from "../maybe/None";
import { IMaybe } from "../maybe/IMaybe";

export const firstTypeMatch = <T, S extends T>(array: T[], predicate: TypePredicate<T, S>): IMaybe<S> => {
    for (const item of array) {
        if (predicate(item))
            return Some(item);
    }
    return None;
};
