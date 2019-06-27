import { None } from "../maybe/None";
import { IMaybe } from "../maybe/IMaybe";
import { Provider } from "../axioms/Provider";
import { TypePredicate } from "../predicates/TypePredicate";
import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { equals } from "../axioms/equals";
import { Constant } from "../axioms/Constant";
import { ISwitchWithLateInput } from "./ISwitchWithLateInput";
import { NonEmptySwitch } from "./NonEmptySwitch";

export const EmptySwitch = (): ISwitchWithLateInput<never, never> => ({
    case<S, R>(possiblyEqualValue: S, resultToUseIfMatch: R): ISwitchWithLateInput<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), Constant(resultToUseIfMatch));
    },
    cases<S, R>(possiblyEqualValues: S[], mapperToUseIfMatch: Mapper<S, R>): ISwitchWithLateInput<S, R> {
        return possiblyEqualValues.length == 0
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch);
    },
    caseLazy<S, R>(possiblyEqualValue: S, resultProviderToUseIfMatch: Provider<R>): ISwitchWithLateInput<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), resultProviderToUseIfMatch);
    },
    matches<S, R>(predicate: Predicate<S>, resultToUseIfMatch: R): ISwitchWithLateInput<S, R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch));
    },
    matchesLazy<S, R>(predicate: Predicate<S>, mapperToUseIfMatch: Mapper<S, R>): ISwitchWithLateInput<S, R> {
        return this.matchesType((r: S): r is S => predicate(r), mapperToUseIfMatch);
    },
    matchesType(predicate: TypePredicate<any, any>, mapperToUseIfMatch: Mapper<any, any>) {
        return NonEmptySwitch([predicate], [mapperToUseIfMatch]);
    },
    resultWhen(input: any): IMaybe<never> { return None; },
});
