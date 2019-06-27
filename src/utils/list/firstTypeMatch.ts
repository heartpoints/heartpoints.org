import { TypePredicate } from "../predicates/TypePredicate";
import { Maybe, Some, None } from "../maybe/maybe";
export const firstTypeMatch = <T, S extends T>(array: T[], predicate: TypePredicate<T, S>): Maybe<S> => {
    for (const item of array) {
        if (predicate(item))
            return Some(item);
    }
    return None;
};
