import { Predicate } from "../predicates/Predicate";
import { Maybe } from "../maybe/maybe";
import { Mapper } from "../axioms/Mapper";
import { Reducer } from "../axioms/Reducer";

export interface IList<T> extends Iterable<T> {
    map<S>(f: Mapper<T, S>): IList<S>;
    push<S>(s: S): IList<T | S>;
    head: Maybe<T>;
    tail: Maybe<IList<T>>;
    reduce<S>(reducer: Reducer<S, T>, startingPoint: S): S;
    first(predicate: Predicate<T>): Maybe<T>;
    isEmpty: boolean;
    notEmpty: boolean;
    toString(): string;
    asArray: Array<T>;
    any(predicate: Predicate<T>): boolean;
}