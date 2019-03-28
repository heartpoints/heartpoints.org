import { Maybe } from "./maybe";
import { Provider } from "./provider";
import * as _ from "lodash";
import { first } from "./list";

interface ISwitch<T, V> {
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, V | R>
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<T | S, V | R>
    value<Q extends T>(input:Q):Maybe<V>;
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V | D;
}

export const EmptySwitch = ():ISwitch<never,never> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<S, R> {
        return NonEmptySwitch([possiblyEqualValue], [() => resultToUseIfMatch])
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<S, R> {
        return NonEmptySwitch([possiblyEqualValue], [resultProviderToUseIfMatch])
    },
    value(input:any):never { throw new Error() },
    valueWithDefault<D>(input:any, defaultValue:D):D { return defaultValue }
});

export const NonEmptySwitch = <T, V>(possiblyEqualValues:T[], resultProviders:Array<Provider<V>>):ISwitch<T, V> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, V | R> {
        return NonEmptySwitch<T |S, V |R>([...possiblyEqualValues, possiblyEqualValue], [...resultProviders, () => resultToUseIfMatch])
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<T | S, V | R> {
        return NonEmptySwitch<T |S, V |R>([...possiblyEqualValues, possiblyEqualValue], [...resultProviders, resultProviderToUseIfMatch])
    },
    value<Q extends T>(input:Q):Maybe<V> {
        const zipped = _.zip(possiblyEqualValues, resultProviders) as [T, Provider<V>][];
        const firstMatch = first(zipped, ([a,]) => a == input);
        return firstMatch.map(([,b]) => b());
    },
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V|D {
        return this.value(input).valueOrDefault(defaultValue)
    }
})