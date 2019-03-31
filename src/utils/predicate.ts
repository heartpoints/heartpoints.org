export type Predicate<T> = (t:T) => boolean;
export type TypePredicate<T, S extends T> = (t:T) => t is S

export const combinePredicates = <T, U>(ts:Array<Predicate<T>>, u:Predicate<U>):Array<Predicate<T | U>> => {
    return [...ts, u] as Array<Predicate<T | U>>
}

export const combineTypePredicates = <A,B extends A,C,D extends C>(ts:Array<TypePredicate<A,B>>, u:TypePredicate<C,D>):Array<TypePredicate<A | C, B | D>> => {
    return [...ts, u] as Array<TypePredicate<A | C, B | D>>
}

export const asTypePredicate = <T>(regularPredicate:Predicate<T>):TypePredicate<T, T> => {
    return regularPredicate as TypePredicate<T, T>
}