import { Predicate, TypePredicate, anyOf } from "./predicate";
import { Maybe, maybe, Some, None } from "./maybe";
import { Dictionary } from "lodash";
import * as _ from "lodash";
import { Mapper } from "./mapper";
import { Pair } from "./pair";

export const first = <T>(list:T[], predicate:Predicate<T>):Maybe<T> => 
    maybe(list.find(predicate))

export const firstTypeMatch = <T, S extends T>(list:T[], predicate:TypePredicate<T, S>):Maybe<S> => {
    for(const item of list) {
        if(predicate(item)) return Some(item)
    }
    return None
}

export const mapDictionary = <T, S>(obj:Dictionary<T>, keyMapper:Mapper<string, string>, valueMapper:Mapper<T, S>):{[k:string]:S} =>
    Object
        .entries(obj)
        .map(([k,v]) => ({newKey: keyMapper(k), newValue: valueMapper(v)}))
        .reduce((soFar, {newKey, newValue}) => ({...soFar, [newKey]: newValue}), {});

export const zip = <T, S>(ts:Array<T>, ss:Array<S>):Maybe<Array<Pair<T, S>>> => {
    return maybe(_.zip(ts, ss) as Array<Pair<T, S>>);
}

export const List = <T>(...items:Array<T>):List<T> => 
    items.reduce(
        (listSoFar, item) => listSoFar.push(item),
        EmptyList as List<T>
    )

export type Reducer<Accumulator, CurrentItem> = (acc:Accumulator, c:CurrentItem) => Accumulator

export interface List<T> {
    map<S>(f:Mapper<T, S>):List<S>
    push<S>(s:S):List<T | S>
    reduce<S>(reducer:Reducer<S, T>, startingPoint:S):S
}

const push = function<T, S>(this:List<T>, s:S) { return NonEmptyList(s, this) }

export const EmptyList:List<never> = {
    map: () => EmptyList,
    push,
    reduce: (_, startingPoint) => startingPoint,
}

export const NonEmptyList = <T, S>(head:T, tail:List<S>):List<T | S> => ({
    map: (f) => NonEmptyList(f(head), tail.map(f)),
    push,
    reduce: (reducer, startingPoint) => tail.reduce(reducer, reducer(startingPoint, head))
})