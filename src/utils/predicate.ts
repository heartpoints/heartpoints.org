export type Predicate<T> = (t:T) => boolean;
export type TypePredicate<T, S extends T> = (t:T) => t is S