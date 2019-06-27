import { Mapper } from "../axioms/Mapper";
import { MaybeFlatmapper } from "./MaybeFlatmapper";

export interface IMaybe<T = any> {
    map<S>(f:Mapper<T, S>):IMaybe<S>
    flatMap<S>(f:MaybeFlatmapper<T, S>):IMaybe<S>
    hasValue:boolean
    value:T
    valueOrDefault<S>(someDefault:S):T | S
    isNone:boolean
    ifElse<S, R>(valueIfSomeObject:S, valueIfNone:R):S | R
}