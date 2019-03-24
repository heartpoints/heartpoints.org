import { Predicate, TypePredicate } from "./predicate";
import { Maybe, maybe } from "../tests/maybe";

export const first = <T>(list:T[], predicate:Predicate<T>):Maybe<T> => {
    const firstMatchingCase = list.find(predicate);
    return maybe(firstMatchingCase);
}

export const firstTypeMatch = <T, S extends T>(list:T[], predicate:TypePredicate<T, S>):Maybe<S> => {
    return first(list, predicate) as Maybe<S>;
}