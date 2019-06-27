import { Predicate } from "../predicates/Predicate";
import { maybe } from "../maybe/maybe";
import { IMaybe } from "../maybe/IMaybe";

export const first = <T>(array: T[], predicate: Predicate<T>): IMaybe<T> => maybe(array.find(predicate));
