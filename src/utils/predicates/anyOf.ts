import { Predicate } from "./Predicate";

export const anyOf = 
    <T>(...predicates: Array<Predicate<T>>): Predicate<T> =>
    (input: T) =>
    predicates.reduce(
        (anyTrue, currentPredicate) => anyTrue || currentPredicate(input), 
        false as boolean
    )
