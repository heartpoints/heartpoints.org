import * as _ from "lodash";
import { first } from "./list";
import { Mapper } from "./mapper";

export interface Maybe<T = any> {
    map<S>(f:Mapper<T, S>):Maybe<S>,
    flatMap<S>(f:MaybeFlatmapper<T, S>):Maybe<S>,
    hasValue:boolean,
    value:T,
    valueOrDefault<S>(someDefault:S):T | S,
    isNone:boolean,
}

export type NoneType = Maybe<never> 

export const None:NoneType = {
    map: (f) => None,
    flatMap: (f) => None,
    get value():never { throw new Error("Cannot get value for type none") },
    hasValue: false,
    valueOrDefault: <S>(someDefault:S):S => someDefault,
    isNone: true,
}

export type MaybeFlatmapper<T, S> = Mapper<T, Maybe<S>>

export const Some = <T>(value:T):Maybe<T> => ({
    map: <S>(f:(t:T)=>S) => Some(f(value)),
    flatMap: <S>(f:MaybeFlatmapper<T, S>):Maybe<S> => {
        const maybeResult = f(value);
        return maybeResult.hasValue ? Some(maybeResult.value) : None
    },
    value,
    hasValue: true,
    valueOrDefault: () => value,
    isNone: false,
});

export const maybeIf = <T>(predicate:boolean, valueIfTrue:T):Maybe<T> => predicate ? Some(valueIfTrue) : None;
export const maybe = <T>(valueIfTrue?:T):Maybe<T> => valueIfTrue !== null && valueIfTrue !== undefined ? Some(valueIfTrue) : None;

export const reduceMaybe = <T>(inputVal:T, ...ops:Array<MaybeFlatmapper<T, T>>):Maybe<T> => 
    ops.reduce((acc, current) => acc.flatMap(current), Some(inputVal));

export const firstMaybe = <T, S>(inputVal:T, ...ops:Array<MaybeFlatmapper<T, S>>):Maybe<S> => {
    const opThatReturnedSomeValue = _.find(ops, op => op(inputVal).hasValue);
    return opThatReturnedSomeValue == undefined
        ? None
        : opThatReturnedSomeValue(inputVal);
}

export const firstSuccessfulMapResult = <T, S extends T>(ts:T[], f:MaybeFlatmapper<T, S>):Maybe<S> => {
    return first(ts, t => f(t).hasValue).flatMap(t => f(t));
}

export const maybeValueForKey = <T>(obj:_.Dictionary<T>) => (key:string):Maybe<T> => maybe(obj[key]);