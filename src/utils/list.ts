import { Predicate, TypePredicate } from "./predicate";
import { Maybe, maybe } from "./maybe";
import { Dictionary } from "lodash";

export const first = <T>(list:T[], predicate:Predicate<T>):Maybe<T> => 
    maybe(list.find(predicate))

export const firstTypeMatch = <T, S extends T>(list:T[], predicate:TypePredicate<T, S>):Maybe<S> => 
    first(list, predicate) as Maybe<S>

export const mapDictionary = <T, S>(obj:Dictionary<T>, keyMapper:Mapper<string, string>, valueMapper:Mapper<T, S>):{[k:string]:S} =>
    Object
        .entries(obj)
        .map(([k,v]) => [keyMapper(k), valueMapper(v)])
        .reduce((soFar, [k,v]) => ({...soFar, [k as string]: v}), {});

export type Mapper<T, S> = (t:T) => S
