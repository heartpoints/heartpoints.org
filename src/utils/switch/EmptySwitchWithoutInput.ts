import { None } from "../maybe/None";
import { NoneType } from "../maybe/NoneType";
import { Provider } from "../axioms/Provider";
import { Constant } from "../axioms/Constant";
import { ISwitchWithoutInput } from "./ISwitchWithoutInput";
import { NonEmptySwitchWithoutInput } from "./NonEmptySwitchWithoutInput";

export const EmptySwitchWithoutInput = (): ISwitchWithoutInput<never> => ({
    case<R>(condition: boolean, resultToUseIfMatch: R): ISwitchWithoutInput<R> {
        return this.matchesLazy(Constant(condition), Constant(resultToUseIfMatch));
    },
    caseLazy<R>(condition: boolean, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<R> {
        return this.matchesLazy(Constant(condition), resultProviderToUseIfMatch);
    },
    matches<R>(predicate: Provider<boolean>, resultToUseIfMatch: R): ISwitchWithoutInput<R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch));
    },
    matchesLazy<R>(predicate: Provider<boolean>, resultProviderToUseIfMatch: Provider<R>): ISwitchWithoutInput<R> {
        return NonEmptySwitchWithoutInput([[predicate, resultProviderToUseIfMatch]]);
    },
    get result(): NoneType {
        return None;
    },
});
