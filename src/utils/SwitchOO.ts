import { Maybe } from "./maybe";
import { Provider } from "./provider";
import * as _ from "lodash";
import { first } from "./list";
import { Predicate, combinePredicates } from "./predicate";
import { Mapper, combineMappers } from "./mapper";

interface ISwitch<T, V> {
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, V | R>
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<T | S, V | R>
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitch<T | S, V | R>
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitch<T | S, V | R>
    value<Q extends T>(input:Q):Maybe<V>;
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V | D;
}

export const EmptySwitch = ():ISwitch<never,never> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<S, R> {
        return this.matchesLazy(input => input == possiblyEqualValue, () => resultToUseIfMatch)
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<S, R> {
        return this.matchesLazy((input) => input == possiblyEqualValue, resultProviderToUseIfMatch)
    },
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitch<S, R> {
        return this.matchesLazy(predicate, () => resultToUseIfMatch)
    },
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitch<S, R> {
        return NonEmptySwitch([predicate], [mapperToUseIfMatch])
    },
    value(input:any):never { throw new Error() },
    valueWithDefault<D>(input:any, defaultValue:D):D { return defaultValue }
});

export const NonEmptySwitch = <T, V>(predicates:Array<Predicate<T>>, resultProviders:Array<Mapper<T, V>>):ISwitch<T, V> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, V | R> {
        return this.matchesLazy(
            input => input == possiblyEqualValue,
            input => resultToUseIfMatch
        )
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<T | S, V | R> {
        return this.matchesLazy(
            input => input == possiblyEqualValue,
            input => resultProviderToUseIfMatch()
        )
    },
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitch<T | S, V | R> {
        return this.matchesLazy(
            predicate,
            input => resultToUseIfMatch
        )
    },
    matchesLazy<S, R>(predicate:Predicate<S>, resultProviderToUseIfMatch:Mapper<S, R>): ISwitch<T | S, V | R> {
        return NonEmptySwitch<T |S, V |R>(
            combinePredicates(predicates, predicate),
            combineMappers(resultProviders, resultProviderToUseIfMatch)
        )
    },
    value<Q extends T>(input:Q):Maybe<V> {
        const zipped = _.zip(predicates, resultProviders) as [Predicate<T>, Mapper<Q, V>][];
        const firstMatch = first(zipped, ([a,]) => a(input) == true);
        return firstMatch.map(([,b]) => b(input));
    },
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V|D {
        return this.value(input).valueOrDefault(defaultValue)
    }
})