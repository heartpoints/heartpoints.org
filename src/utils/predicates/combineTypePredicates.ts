import { TypePredicate } from "./TypePredicate";
export const combineTypePredicates = <A, B extends A, C, D extends C>(ts: Array<TypePredicate<A, B>>, u: TypePredicate<C, D>): Array<TypePredicate<A | C, B | D>> => {
    return [...ts, u] as Array<TypePredicate<A | C, B | D>>;
};
