import { Predicate, TypePredicate } from "./predicate";
import { Maybe, maybe, Some, None } from "./maybe";
import { Dictionary } from "lodash";
import * as _ from "lodash";
import { Mapper } from "./mapper";
import { Pair } from "./pair";
import { False } from "./False";

export const first = <T>(array:T[], predicate:Predicate<T>):Maybe<T> => 
    maybe(array.find(predicate))

export const firstTypeMatch = <T, S extends T>(array:T[], predicate:TypePredicate<T, S>):Maybe<S> => {
    for(const item of array) {
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

export const ListOfLiterals = <T>(...items:Array<T>):List<T> => 
    items.reduce(
        (listSoFar, item) => listSoFar.push(item),
        EmptyList as List<T>
    )

export const List = <T>(array:Array<T>):List<T> => ListOfLiterals(...array)

export const L = ListOfLiterals

export type Reducer<Accumulator, CurrentItem> = (acc:Accumulator, c:CurrentItem) => Accumulator

export interface List<T> extends Iterable<T> {
    map<S>(f:Mapper<T, S>):List<S>
    push<S>(s:S):List<T | S>
    head:Maybe<T>
    tail:Maybe<List<T>>
    reduce<S>(reducer:Reducer<S, T>, startingPoint:S):S
    first(predicate:Predicate<T>):Maybe<T>
    isEmpty:boolean,
    notEmpty:boolean,
    toString():string,
    asArray:Array<T>,
    any(predicate:Predicate<T>):boolean,
}

export const EmptyList:List<never> = {
    map: () => EmptyList,
    push: i => NonEmptyList(i, EmptyList),
    head: None,
    tail: None,
    reduce: (_, startingPoint) => startingPoint,
    first: () => None,
    [Symbol.iterator]: () => EmptyList.asArray[Symbol.iterator](),
    isEmpty:true,
    notEmpty:false,
    asArray:[],
    toString: () => "[]",
    any: False,
}

export const NonEmptyList = <T, S>(head:T, tail:List<S>):List<T | S> => ({
    map: f => NonEmptyList(f(head), tail.map(f)),
    push(i) { return NonEmptyList(head, tail.push(i)) },
    get head() { return Some(head) },
    get tail() { return Some(tail) },
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
    toString() { return this.asArray.toString() },
    any: predicate => predicate(head) ? true : tail.any(predicate),
    [Symbol.iterator]() { return this.asArray[Symbol.iterator]() },
})