import { Predicate } from "../predicates/Predicate";
import { Maybe, maybe } from "../maybe/maybe";
export const first = <T>(array: T[], predicate: Predicate<T>): Maybe<T> => maybe(array.find(predicate));
