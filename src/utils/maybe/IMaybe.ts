import { Mapper } from "../axioms/Mapper";
import { MaybeFlatmapper } from "./MaybeFlatmapper";
import { NoneType } from "./NoneType";
import { SomeType } from "./SomeType";
import { Provider } from "../axioms/Provider";
import { Predicate } from "../predicates/Predicate";

export interface IMaybe<T = any> {
    if(predicate:Predicate<T>):IMaybe<T>
    map<S>(f:Mapper<T, S>):IMaybe<S>
    mapOrDefault<S, R>(f:Mapper<T, S>, r:R): S | R
    flatMap<S>(f:MaybeFlatmapper<T, S>):IMaybe<S>
    hasValue():this is SomeType<T>
    valueOrDefault<S>(someDefault:S):T | S
    valueOr<S>(defaultProducer:Provider<S>):T | S
    isNone():this is NoneType
    value:T //todo: remove when ready to handle all the breaking stuff in restguru!
    ifElse<S, R>(valueIfSomeObject:S, valueIfNone:R):S | R
}