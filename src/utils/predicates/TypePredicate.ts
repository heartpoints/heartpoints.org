export type TypePredicate<T, S extends T> = (t: T) => t is S;
