import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { ISwitchResult } from "./ISwitchResult";

export interface ISwitchWithEarlyInput<T, V> extends ISwitchResult<V> {
    case<R>(possiblyEqualValue: T, resultToUseIfMatch: R): ISwitchWithEarlyInput<T, R | V>;
    cases<R>(possiblyEqualValues: T[], mapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, V | R>;
    caseLazy<R>(possiblyEqualValue: T, mapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, V | R>;
    matches<R>(predicate: Predicate<T>, resultToUseIfMatch: R): ISwitchWithEarlyInput<T, V | R>;
    matchesLazy<R>(predicate: Predicate<T>, resultMapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, R | V>;
}
