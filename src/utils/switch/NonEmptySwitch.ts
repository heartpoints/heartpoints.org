import { Maybe } from "../maybe/maybe";
import { Provider } from "../axioms/Provider";
import { zip } from "../list/zip";
import { first } from "../list/first";
import { asTypePredicate } from "../predicates/asTypePredicate";
import { combineTypePredicates } from "../predicates/combineTypePredicates";
import { TypePredicate } from "../predicates/TypePredicate";
import { Predicate } from "../predicates/Predicate";
import { Mapper } from "../axioms/Mapper";
import { combineMappers } from "./combineMappers";
import { equals } from "../axioms/equals";
import { Constant } from "../axioms/Constant";
import { ISwitchWithLateInput } from "./ISwitchWithLateInput";

export const NonEmptySwitch = <PossibleInputTypes, PossibleOutputTypes>(typePredicates: Array<TypePredicate<PossibleInputTypes, any>>, resultMappers: Array<Mapper<PossibleInputTypes, PossibleOutputTypes>>): ISwitchWithLateInput<PossibleInputTypes, PossibleOutputTypes> => ({
    case<NewInputType, NewOutputType>(possiblyEqualValue: NewInputType, resultToUseIfMatch: NewOutputType): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(equals(possiblyEqualValue), Constant(resultToUseIfMatch));
    },
    cases<NewInputType, NewOutputType>(possiblyEqualValues: NewInputType[], mapperToUseIfMatch: Mapper<NewInputType, NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return possiblyEqualValues.length == 0
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch);
    },
    caseLazy<NewInputType, NewOutputType>(possiblyEqualValue: NewInputType, resultProviderToUseIfMatch: Provider<NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(equals(possiblyEqualValue), input => resultProviderToUseIfMatch());
    },
    matches<NewInputType, NewOutputType>(predicate: Predicate<NewInputType>, resultToUseIfMatch: NewOutputType): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch));
    },
    matchesLazy<NewInputType, NewOutputType>(predicate: Predicate<NewInputType>, mapperToUseIfMatch: Mapper<NewInputType, NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(combineTypePredicates(typePredicates, asTypePredicate(predicate)), combineMappers(resultMappers, mapperToUseIfMatch));
    },
    matchesType<NewInputType, NewOutputType>(predicate: TypePredicate<NewInputType, any>, mapperToUseIfMatch: Mapper<any, NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(combineTypePredicates(typePredicates, predicate), combineMappers(resultMappers, mapperToUseIfMatch));
    },
    resultWhen<ActualInputType extends PossibleInputTypes>(input: ActualInputType): Maybe<PossibleOutputTypes> {
        return zip(typePredicates, resultMappers)
            .flatMap(zipped => first(zipped, ([a,]) => a(input) == true))
            .map(([, b]) => b(input));
    },
});
