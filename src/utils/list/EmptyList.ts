import { None } from "../maybe/maybe";
import { False } from "../axioms/False";
import { IList } from "./IList";
import { NonEmptyList } from "./NonEmptyList";

export const EmptyList: IList<never> = {
    map: () => EmptyList,
    push: i => NonEmptyList(i, EmptyList),
    head: None,
    tail: None,
    reduce: (_, startingPoint) => startingPoint,
    first: () => None,
    [Symbol.iterator]: () => EmptyList.asArray[Symbol.iterator](),
    isEmpty: true,
    notEmpty: false,
    asArray: [],
    toString: () => "[]",
    any: False,
};
