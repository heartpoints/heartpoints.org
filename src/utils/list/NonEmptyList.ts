import { Some } from "../maybe/maybe";
import { IList } from "./IList";
export const NonEmptyList = <T, S>(head: T, tail: IList<S>): IList<T | S> => ({
    map: f => NonEmptyList(f(head), tail.map(f)),
    push(i) { return NonEmptyList(head, tail.push(i)); },
    get head() { return Some(head); },
    get tail() { return Some(tail); },
    reduce: (reducer, startingPoint) => tail.reduce(reducer, reducer(startingPoint, head)),
    first: predicate => predicate(head) ? Some(head) : tail.first(predicate),
    isEmpty: false,
    notEmpty: true,
    get asArray() {
        return this.reduce((arraySoFar, item) => [...arraySoFar, item], [] as Array<T | S>);
    },
    toString() { return this.asArray.toString(); },
    any: predicate => predicate(head) ? true : tail.any(predicate),
    [Symbol.iterator]() { return this.asArray[Symbol.iterator](); },
});
