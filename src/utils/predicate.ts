export type Predicate<T> = (t:T) => boolean;
export type TypePredicate<T, S extends T> = (t:T) => t is S

export const combinePredicates = <T, U>(ts:Array<Predicate<T>>, u:Predicate<U>):Array<Predicate<T | U>> => {
    return [...ts, u] as Array<Predicate<T | U>>
}