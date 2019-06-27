import { Provider } from "../axioms/Provider";
import { TypePredicate } from "../predicates/TypePredicate";
import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { ISwitchWithLateInput } from "./ISwitchWithLateInput";

export interface ICaseMatch<T, V> {
    case<S, R>(possiblyEqualValue: S, resultToUseIfMatch: R): ISwitchWithLateInput<T | S, V | R>;
    cases<S, R>(possiblyEqualValues: S[], mapperToUseIfMatch: Mapper<S, R>): ISwitchWithLateInput<T | S, V | R>;
    caseLazy<S, R>(possiblyEqualValue: S, resultProviderToUseIfMatch: Provider<R>): ISwitchWithLateInput<T | S, V | R>;
    matches<S, R>(predicate: Predicate<S>, resultToUseIfMatch: R): ISwitchWithLateInput<T | S, V | R>;
    matchesLazy<S, R>(predicate: Predicate<S>, mapperToUseIfMatch: Mapper<S, R>): ISwitchWithLateInput<T | S, V | R>;
    matchesType<S, R, L extends S>(predicate: TypePredicate<S, L>, mapperToUseIfMatch: Mapper<L, R>): ISwitchWithLateInput<T | S, V | R>;
}
