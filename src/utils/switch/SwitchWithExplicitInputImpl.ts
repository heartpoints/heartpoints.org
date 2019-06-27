import { IMaybe } from "../maybe/IMaybe";
import { List } from "../list/List";
import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { equals } from "../axioms/equals";
import { Constant } from "../axioms/Constant";
import { ISwitchWithEarlyInput } from "./ISwitchWithEarlyInput";
import { ExplicitInputPredicateMapperPairs } from "./ExplicitInputPredicateMapperPairs";

export const SwitchWithExplicitInputImpl = <T, V>(input: T, predicateMapperPairs: ExplicitInputPredicateMapperPairs<T, V>): ISwitchWithEarlyInput<T, V> => ({
    case<R>(possiblyEqualValue: T, resultToUseIfMatch: R): ISwitchWithEarlyInput<T, R | V> {
        return this.matchesLazy(equals(possiblyEqualValue), Constant(resultToUseIfMatch));
    },
    cases<R>(possiblyEqualValues: T[], mapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(item => List(possiblyEqualValues).any(equals(item)), mapperToUseIfMatch);
    },
    caseLazy<R>(possiblyEqualValue: T, mapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(equals(possiblyEqualValue), mapperToUseIfMatch);
    },
    matches<R>(predicate: Predicate<T>, resultToUseIfMatch: R): ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch));
    },
    matchesLazy<R>(predicate: Predicate<T>, resultMapperToUseIfMatch: Mapper<T, R>): ISwitchWithEarlyInput<T, R | V> {
        return SwitchWithExplicitInputImpl<T, R | V>(input, [
            ...predicateMapperPairs,
            [predicate, resultMapperToUseIfMatch]
        ]);
    },
    get result(): IMaybe<V> {
        return List(predicateMapperPairs)
            .first(([predicate]) => predicate(input))
            .map(([_, mapper]) => mapper(input));
    },
});
