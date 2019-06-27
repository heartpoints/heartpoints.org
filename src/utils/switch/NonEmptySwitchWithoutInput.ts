import { IMaybe } from "../maybe/IMaybe";
import { Provider } from "../axioms/Provider";
import { first } from "../list/first";
import { Constant } from "../axioms/Constant";
import { ISwitchWithoutInput } from "./ISwitchWithoutInput";
import { PredicateProviderPairs } from "./PredicateProviderPairs";

export const NonEmptySwitchWithoutInput = <V>(predicateProviderPairs: PredicateProviderPairs<V>): ISwitchWithoutInput<V> => ({
    case<R>(condition: boolean, resultToUseIfMatch: R): ISwitchWithoutInput<V | R> {
        return this.matchesLazy(Constant(condition), Constant(resultToUseIfMatch));
    },
    caseLazy<R>(condition: boolean, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<V | R> {
        return this.matchesLazy(Constant(condition), resultProviderToUseIfMatch);
    },
    matches<R>(predicate: Provider<boolean>, resultToUseIfMatch: R): ISwitchWithoutInput<V | R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch));
    },
    matchesLazy<R>(predicate: Provider<boolean>, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<V | R> {
        return NonEmptySwitchWithoutInput<V | R>([...predicateProviderPairs, [predicate, resultProviderToUseIfMatch]]);
    },
    get result(): IMaybe<V> {
        return first(predicateProviderPairs, ([predicate]) => predicate()).map(([_, provider]) => provider());
    },
});
