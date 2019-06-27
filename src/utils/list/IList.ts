import { Predicate } from "../predicates/Predicate";
import { IMaybe } from "../maybe/IMaybe";
import { Mapper } from "../axioms/Mapper";
import { Reducer } from "../axioms/Reducer";

export interface IList<T> extends Iterable<T> {
    map<S>(f: Mapper<T, S>): IList<S>;
    push<S>(s: S): IList<T | S>;
    head: IMaybe<T>;
    tail: IMaybe<IList<T>>;
    reduce<S>(reducer: Reducer<S, T>, startingPoint: S): S;
    first(predicate: Predicate<T>): IMaybe<T>;
    isEmpty: boolean;
    notEmpty: boolean;
    toString(): string;
    asArray: Array<T>;
    any(predicate: Predicate<T>): boolean;
}