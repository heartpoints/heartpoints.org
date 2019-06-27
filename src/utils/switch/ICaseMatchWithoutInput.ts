import { Provider } from "../axioms/Provider";
import { ISwitchWithoutInput } from "./ISwitchWithoutInput";

export interface ICaseMatchWithoutInput<V> {
    case<R>(condition: boolean, resultToUseIfMatch: R): ISwitchWithoutInput<V | R>;
    caseLazy<R>(condition: boolean, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<V | R>;
    matches<R>(predicate: Provider<boolean>, resultToUseIfMatch: R): ISwitchWithoutInput<V | R>;
    matchesLazy<R>(predicate: Provider<boolean>, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<V | R>;
}
