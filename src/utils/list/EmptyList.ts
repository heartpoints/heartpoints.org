import { None } from "../maybe/None";
import { False } from "../axioms/False";
import { IList } from "./IList";
import { NonEmptyList } from "./NonEmptyList";

const produceEmptyList = () => EmptyList

export const EmptyList: IList<never> = {
    map: produceEmptyList,
    flatMap: produceEmptyList,
    where: produceEmptyList,
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
    append: <S>(otherList:IList<S>) => otherList,
    join: () => ``
};
