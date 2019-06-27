import { Predicate } from "./Predicate";

export const combinePredicates = <T, U>(ts: Array<Predicate<T>>, u: Predicate<U>): Array<Predicate<T | U>> => {
    return [...ts, u] as Array<Predicate<T | U>>;
};
