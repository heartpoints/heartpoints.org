import { Maybe, None, NoneType } from "./maybe";
import { Provider } from "./provider";
import { first, zip } from "./list";
import { Predicate, TypePredicate, combineTypePredicates, asTypePredicate } from "./predicate";
import { Mapper, combineMappers } from "./mapper";
import { Pair } from "./pair";
import { equals } from "./equals";
import { Constant } from "./constant";

export interface ISwitchWithLateInput<T, V> extends ICaseMatch<T, V> {
    resultWhen<Q extends T>(input:Q):Maybe<V>;
}

export interface ISwitchWithEarlyInput<T, V> extends ISwitchResult<V> {
    case<R>(possiblyEqualValue:T, resultToUseIfMatch:R):ISwitchWithEarlyInput<T, R | V>
    cases<R>(possiblyEqualValues:T[], mapperToUseIfMatch:Mapper<T, R>):ISwitchWithEarlyInput<T, V | R>
    caseLazy<R>(possiblyEqualValue:T, mapperToUseIfMatch:Mapper<T, R>):ISwitchWithEarlyInput<T, V | R>
    matches<R>(predicate:Predicate<T>, resultToUseIfMatch:R): ISwitchWithEarlyInput<T, V | R>
    matchesLazy<R>(predicate:Predicate<T>, resultMapperToUseIfMatch:Mapper<T, R>): ISwitchWithEarlyInput<T, R | V>,
}

export interface ICaseMatch<T, V> {
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitchWithLateInput<T | S, V | R>
    cases<S, R>(possiblyEqualValues:S[], mapperToUseIfMatch:Mapper<S, R>):ISwitchWithLateInput<T | S, V | R>
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitchWithLateInput<T | S, V | R>
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitchWithLateInput<T | S, V | R>
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitchWithLateInput<T | S, V | R>
    matchesType<S, R, L extends S>(predicate:TypePredicate<S, L>, mapperToUseIfMatch:Mapper<L, R>): ISwitchWithLateInput<T | S, V | R>
}

export interface ICaseMatchWithoutInput<V> {
    case<R>(condition:boolean, resultToUseIfMatch:R):ISwitchWithoutInput<V | R>
    caseLazy<R>(condition:boolean, resultProviderToUseIfMatch:Provider<R>):ISwitchWithoutInput<V | R>
    matches<R>(predicate:Provider<boolean>, resultToUseIfMatch:R): ISwitchWithoutInput<V | R>
    matchesLazy<R>(predicate:Provider<boolean>, resultProviderToUseIfMatch:Provider<R>): ISwitchWithoutInput<V | R>
}

export interface ISwitchResult<V> {
    result:Maybe<V>;
}

export interface ISwitchWithoutInput<V> extends ICaseMatchWithoutInput<V>, ISwitchResult<V> {}

const SwitchWithExplicitInput = <T>(input:T):ISwitchWithEarlyInput<T, never> => {
    return SwitchWithExplicitInputImpl(input, [])
}

type ExplicitInputPredicateMapperPair<T, R> = Pair<Predicate<T>, Mapper<T, R>>
type ExplicitInputPredicateMapperPairs<T, R> = Array<ExplicitInputPredicateMapperPair<T, R>>

const SwitchWithExplicitInputImpl = <T, V>(input:T, predicateMapperPairs:ExplicitInputPredicateMapperPairs<T, V>):ISwitchWithEarlyInput<T, V> => ({
    case<R>(possiblyEqualValue:T, resultToUseIfMatch:R):ISwitchWithEarlyInput<T, R | V> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            Constant(resultToUseIfMatch)
        )
    },
    cases<R>(possiblyEqualValues:T[], mapperToUseIfMatch:Mapper<T, R>):ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(
            item => possiblyEqualValues.includes(item),
            mapperToUseIfMatch
        )
    },
    caseLazy<R>(possiblyEqualValue:T, mapperToUseIfMatch:Mapper<T, R>):ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            mapperToUseIfMatch
        )
    },
    matches<R>(predicate:Predicate<T>, resultToUseIfMatch:R): ISwitchWithEarlyInput<T, V | R> {
        return this.matchesLazy(
            predicate,
            Constant(resultToUseIfMatch)
        )
    },
    matchesLazy<R>(predicate:Predicate<T>, resultMapperToUseIfMatch:Mapper<T, R>): ISwitchWithEarlyInput<T, R | V> {
        return SwitchWithExplicitInputImpl<T, R | V>(
            input, 
            [
                ...predicateMapperPairs, 
                [predicate, resultMapperToUseIfMatch]
            ]
        )
    },
    get result():Maybe<V> {
        return first(
            predicateMapperPairs,
            ([predicate]) => predicate(input)
        ).map(
            ([_, mapper]) => mapper(input)
        )
    },
})

const SwitchWithoutInput = ():ISwitchWithoutInput<never> => EmptySwitchWithoutInput();
const EmptySwitchWithoutInput = ():ISwitchWithoutInput<never> => ({
    case<R>(condition:boolean, resultToUseIfMatch:R):ISwitchWithoutInput<R> {
        return this.matchesLazy(Constant(condition), Constant(resultToUseIfMatch))
    },
    caseLazy<R>(condition:boolean, resultProviderToUseIfMatch:Provider<R>):ISwitchWithoutInput<R> {
        return this.matchesLazy(Constant(condition), resultProviderToUseIfMatch)
    },
    matches<R>(predicate:Provider<boolean>, resultToUseIfMatch:R): ISwitchWithoutInput<R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch))
    },
    matchesLazy<R>(predicate:Provider<boolean>, resultProviderToUseIfMatch:Provider<R>): ISwitchWithoutInput<R> {
        return NonEmptySwitchWithoutInput([[predicate, resultProviderToUseIfMatch]])
    },
    get result():NoneType {
        return None
    },
})

type PredicateProviderPair<V> = Pair<Provider<boolean>, Provider<V>>
type PredicateProviderPairs<V> = Array<PredicateProviderPair<V>>

const NonEmptySwitchWithoutInput = <V>(predicateProviderPairs:PredicateProviderPairs<V>):ISwitchWithoutInput<V> => ({
    case<R>(condition:boolean, resultToUseIfMatch:R):ISwitchWithoutInput<V | R> {
        return this.matchesLazy(Constant(condition), Constant(resultToUseIfMatch))
    },
    caseLazy<R>(condition:boolean, resultProviderToUseIfMatch:Provider<R>):ISwitchWithoutInput<V | R> {
        return this.matchesLazy(Constant(condition), resultProviderToUseIfMatch)
    },
    matches<R>(predicate:Provider<boolean>, resultToUseIfMatch:R): ISwitchWithoutInput<V | R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch))
    },
    matchesLazy<R>(predicate:Provider<boolean>, resultProviderToUseIfMatch:Provider<R>): ISwitchWithoutInput<V | R> {
        return NonEmptySwitchWithoutInput<V | R>(
            [...predicateProviderPairs, [predicate, resultProviderToUseIfMatch]]
        )
    },
    get result():Maybe<V> {
        return first(
            predicateProviderPairs,
            ([predicate]) => predicate()
        ).map(([_, provider]) => provider())
    },
})

const EmptySwitch = ():ISwitchWithLateInput<never,never> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitchWithLateInput<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), Constant(resultToUseIfMatch))
    },
    cases<S, R>(possiblyEqualValues:S[], mapperToUseIfMatch:Mapper<S, R>):ISwitchWithLateInput<S, R> {
        return possiblyEqualValues.length == 0 
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch)
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitchWithLateInput<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), resultProviderToUseIfMatch)
    },
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitchWithLateInput<S, R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch))
    },
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitchWithLateInput<S, R> {
        return this.matchesType((r:S):r is S => predicate(r), mapperToUseIfMatch);
    },
    matchesType(predicate:TypePredicate<any,any>, mapperToUseIfMatch:Mapper<any,any>) {
        return NonEmptySwitch([predicate], [mapperToUseIfMatch])
    },
    resultWhen(input:any):Maybe<never> { return None },
});

const NonEmptySwitch = <PossibleInputTypes, PossibleOutputTypes>(typePredicates:Array<TypePredicate<PossibleInputTypes, any>>, resultMappers:Array<Mapper<PossibleInputTypes, PossibleOutputTypes>>):ISwitchWithLateInput<PossibleInputTypes, PossibleOutputTypes> => ({
    case<NewInputType, NewOutputType>(possiblyEqualValue:NewInputType, resultToUseIfMatch:NewOutputType):ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            Constant(resultToUseIfMatch)
        )
    },
    cases<NewInputType, NewOutputType>(possiblyEqualValues:NewInputType[], mapperToUseIfMatch:Mapper<NewInputType, NewOutputType>):ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return possiblyEqualValues.length == 0 
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch)
    },
    caseLazy<NewInputType, NewOutputType>(possiblyEqualValue:NewInputType, resultProviderToUseIfMatch:Provider<NewOutputType>):ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            input => resultProviderToUseIfMatch()
        )
    },
    matches<NewInputType, NewOutputType>(predicate:Predicate<NewInputType>, resultToUseIfMatch:NewOutputType): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            predicate,
            Constant(resultToUseIfMatch)
        )
    },
    matchesLazy<NewInputType, NewOutputType>(predicate:Predicate<NewInputType>, mapperToUseIfMatch:Mapper<NewInputType, NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(
            combineTypePredicates(typePredicates, asTypePredicate(predicate)),
            combineMappers(resultMappers, mapperToUseIfMatch)
        )
    },
    matchesType<NewInputType, NewOutputType>(predicate:TypePredicate<NewInputType,any>, mapperToUseIfMatch:Mapper<any,NewOutputType>): ISwitchWithLateInput<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(
            combineTypePredicates(typePredicates, predicate),
            combineMappers(resultMappers, mapperToUseIfMatch)
        )
    },
    resultWhen<ActualInputType extends PossibleInputTypes>(input:ActualInputType):Maybe<PossibleOutputTypes> {
        return zip(typePredicates, resultMappers)
            .flatMap(zipped => first(zipped, ([a,]) => a(input) == true))
            .map(([,b]) => b(input));
    },
})

export interface ISwitch {
    when<T>(value:T): ISwitchWithEarlyInput<T, never>,
    withoutInput: ISwitchWithoutInput<never>,
    that: ISwitchWithLateInput<never, never>
}

export const Switch:ISwitch = {
    when: SwitchWithExplicitInput,
    withoutInput: EmptySwitchWithoutInput(),
    that: EmptySwitch()
}