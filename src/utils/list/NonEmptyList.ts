import { Some } from "../maybe/Some";
import { IList } from "./IList";
import { Predicate } from "../predicates/Predicate";

export const NonEmptyList = <T, S>(head: T, tail: IList<S>): IList<T | S> => ({
    map: f => NonEmptyList(f(head), tail.map(f)),
    flatMap: f => f(head).append(tail.flatMap(f)),
    where: (p:Predicate<T | S>) => p(head) ? NonEmptyList(head, tail.where(p)) : tail.where(p),
    push(i) { return NonEmptyList(head, tail.push(i)); },
    get head() { return Some(head); },
    get tail() { return Some(tail); },
    reduce: (reducer, startingPoint) => tail.reduce(reducer, reducer(startingPoint, head)),
    first: predicate => predicate(head) ? Some(head) : tail.first(predicate),
    isEmpty: false,
    notEmpty: true,
    get asArray() {
        return this.reduce(
            (arraySoFar, item) => [...arraySoFar, item],
            [] as Array<T | S>
        )
    },
    toString() { return `[${this.map((e:any) => e.toString()).join(", ")}]` },
    any: predicate => predicate(head) ? true : tail.any(predicate),
    [Symbol.iterator]() { return this.asArray[Symbol.iterator](); },
    append: <S>(otherList:IList<S>) => NonEmptyList(head, tail.append(otherList)),
    join(delimiter) { return this.asArray.join(delimiter) }
});
