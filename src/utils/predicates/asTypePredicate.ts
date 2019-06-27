import { Predicate } from "./Predicate";
import { TypePredicate } from "./TypePredicate";

export const asTypePredicate = <T>(regularPredicate: Predicate<T>): TypePredicate<T, T> => {
    return regularPredicate as TypePredicate<T, T>;
};
