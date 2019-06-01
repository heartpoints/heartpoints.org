import { Maybe, None } from "./maybe";
import { Provider } from "./provider";
import { first, zip } from "./list";
import { Predicate, TypePredicate, combineTypePredicates, asTypePredicate } from "./predicate";
import { Mapper, combineMappers } from "./mapper";
import { Pair } from "./pair";
import { equals } from "./equals";
import { Constant } from "./constant";

interface ISwitch<T, V> extends ICaseMatch<T, V> {
    get<Q extends T>(input:Q):Maybe<V>;
    getOrDefault<Q extends T, D>(input:Q, defaultValue:D):V | D;
}

interface ISwitchWithExplicitInput<T, V> extends ISwitchGetter<V> {
    case<R>(possiblyEqualValue:T, resultToUseIfMatch:R):ISwitchWithExplicitInput<T, R | V>
    cases<R>(possiblyEqualValues:T[], mapperToUseIfMatch:Mapper<T, R>):ISwitchWithExplicitInput<T, V | R>
    caseLazy<R>(possiblyEqualValue:T, mapperToUseIfMatch:Mapper<T, R>):ISwitchWithExplicitInput<T, V | R>
    matches<R>(predicate:Predicate<T>, resultToUseIfMatch:R): ISwitchWithExplicitInput<T, V | R>
    matchesLazy<R>(predicate:Predicate<T>, resultMapperToUseIfMatch:Mapper<T, R>): ISwitchWithExplicitInput<T, R | V>,
}

interface ICaseMatch<T, V> {
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, V | R>
    cases<S, R>(possiblyEqualValues:S[], mapperToUseIfMatch:Mapper<S, R>):ISwitch<T | S, V | R>
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<T | S, V | R>
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitch<T | S, V | R>
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitch<T | S, V | R>
    matchesType<S, R, L extends S>(predicate:TypePredicate<S, L>, mapperToUseIfMatch:Mapper<L, R>): ISwitch<T | S, V | R>
}

interface ICaseMatchWithoutInput<V> {
    case<R>(condition:boolean, resultToUseIfMatch:R):ISwitchWithoutInput<V | R>
    caseLazy<R>(condition:boolean, resultProviderToUseIfMatch:Provider<R>):ISwitchWithoutInput<V | R>
    matches<R>(predicate:Provider<boolean>, resultToUseIfMatch:R): ISwitchWithoutInput<V | R>
    matchesLazy<R>(predicate:Provider<boolean>, resultProviderToUseIfMatch:Provider<R>): ISwitchWithoutInput<V | R>
}

interface ISwitchGetter<V> {
    get():Maybe<V>;
    getOrDefault<D>(defaultValue:D):V | D;
}

interface ISwitchWithoutInput<V> extends ICaseMatchWithoutInput<V>, ISwitchGetter<V> {}

//todo: logic to combine two switches into a larger switch
export const SwitchWithExplicitInput = <T>(input:T):ISwitchWithExplicitInput<T, never> => {
    return SwitchWithExplicitInputImpl(input, [])
}

type ExplicitInputPredicateMapperPair<T, R> = Pair<Predicate<T>, Mapper<T, R>>
type ExplicitInputPredicateMapperPairs<T, R> = Array<ExplicitInputPredicateMapperPair<T, R>>

const SwitchWithExplicitInputImpl = <T, V>(input:T, predicateMapperPairs:ExplicitInputPredicateMapperPairs<T, V>):ISwitchWithExplicitInput<T, V> => ({
    case<R>(possiblyEqualValue:T, resultToUseIfMatch:R):ISwitchWithExplicitInput<T, R | V> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            Constant(resultToUseIfMatch)
        )
    },
    cases<R>(possiblyEqualValues:T[], mapperToUseIfMatch:Mapper<T, R>):ISwitchWithExplicitInput<T, V | R> {
        return this.matchesLazy(
            item => possiblyEqualValues.includes(item),
            mapperToUseIfMatch
        )
    },
    caseLazy<R>(possiblyEqualValue:T, mapperToUseIfMatch:Mapper<T, R>):ISwitchWithExplicitInput<T, V | R> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            mapperToUseIfMatch
        )
    },
    matches<R>(predicate:Predicate<T>, resultToUseIfMatch:R): ISwitchWithExplicitInput<T, V | R> {
        return this.matchesLazy(
            predicate,
            Constant(resultToUseIfMatch)
        )
    },
    matchesLazy<R>(predicate:Predicate<T>, resultMapperToUseIfMatch:Mapper<T, R>): ISwitchWithExplicitInput<T, R | V> {
        return SwitchWithExplicitInputImpl<T, R | V>(
            input, 
            [
                ...predicateMapperPairs, 
                [predicate, resultMapperToUseIfMatch]
            ]
        )
    },
    get():Maybe<V> {
        return first(
            predicateMapperPairs,
            ([predicate]) => predicate(input)
        ).map(
            ([_, mapper]) => mapper(input)
        )
    },
    getOrDefault<D>(defaultValue:D):V | D {
        return this.get().valueOrDefault(defaultValue);
    }
})

export const SwitchWithoutInput = ():ISwitchWithoutInput<never> => EmptySwitchWithoutInput();
export const EmptySwitchWithoutInput = ():ISwitchWithoutInput<never> => ({
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
    get():Maybe<never> {
        return None
    },
    getOrDefault<D>(defaultValue:D):D {
        return defaultValue
    }
})

type PredicateProviderPair<V> = Pair<Provider<boolean>, Provider<V>>
type PredicateProviderPairs<V> = Array<PredicateProviderPair<V>>

export const NonEmptySwitchWithoutInput = <V>(predicateProviderPairs:PredicateProviderPairs<V>):ISwitchWithoutInput<V> => ({
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
    get():Maybe<V> {
        return first(
            predicateProviderPairs,
            ([predicate]) => predicate()
        ).map(([_, provider]) => provider())
    },
    getOrDefault<D>(defaultValue:D):V | D {
        return this.get().valueOrDefault(defaultValue)
    }
})

export const Switch = ():ISwitch<never, never> => EmptySwitch();

export const EmptySwitch = ():ISwitch<never,never> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), Constant(resultToUseIfMatch))
    },
    cases<S, R>(possiblyEqualValues:S[], mapperToUseIfMatch:Mapper<S, R>):ISwitch<S, R> {
        return possiblyEqualValues.length == 0 
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch)
    },
    caseLazy<S, R>(possiblyEqualValue:S, resultProviderToUseIfMatch:Provider<R>):ISwitch<S, R> {
        return this.matchesLazy(equals(possiblyEqualValue), resultProviderToUseIfMatch)
    },
    matches<S, R>(predicate:Predicate<S>, resultToUseIfMatch:R): ISwitch<S, R> {
        return this.matchesLazy(predicate, Constant(resultToUseIfMatch))
    },
    matchesLazy<S, R>(predicate:Predicate<S>, mapperToUseIfMatch:Mapper<S, R>): ISwitch<S, R> {
        return this.matchesType((r:S):r is S => predicate(r), mapperToUseIfMatch);
    },
    matchesType(predicate:TypePredicate<any,any>, mapperToUseIfMatch:Mapper<any,any>) {
        return NonEmptySwitch([predicate], [mapperToUseIfMatch])
    },
    get(input:any):never { throw new Error() },
    getOrDefault<D>(input:any, defaultValue:D):D { return defaultValue }
});

export const NonEmptySwitch = <PossibleInputTypes, PossibleOutputTypes>(typePredicates:Array<TypePredicate<PossibleInputTypes, any>>, resultMappers:Array<Mapper<PossibleInputTypes, PossibleOutputTypes>>):ISwitch<PossibleInputTypes, PossibleOutputTypes> => ({
    case<NewInputType, NewOutputType>(possiblyEqualValue:NewInputType, resultToUseIfMatch:NewOutputType):ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            Constant(resultToUseIfMatch)
        )
    },
    cases<NewInputType, NewOutputType>(possiblyEqualValues:NewInputType[], mapperToUseIfMatch:Mapper<NewInputType, NewOutputType>):ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return possiblyEqualValues.length == 0 
            ? this
            : this
                .matchesLazy(equals(possiblyEqualValues[0]), mapperToUseIfMatch)
                .cases(possiblyEqualValues.slice(1), mapperToUseIfMatch)
    },
    caseLazy<NewInputType, NewOutputType>(possiblyEqualValue:NewInputType, resultProviderToUseIfMatch:Provider<NewOutputType>):ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            equals(possiblyEqualValue),
            input => resultProviderToUseIfMatch()
        )
    },
    matches<NewInputType, NewOutputType>(predicate:Predicate<NewInputType>, resultToUseIfMatch:NewOutputType): ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return this.matchesLazy(
            predicate,
            Constant(resultToUseIfMatch)
        )
    },
    matchesLazy<NewInputType, NewOutputType>(predicate:Predicate<NewInputType>, mapperToUseIfMatch:Mapper<NewInputType, NewOutputType>): ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(
            combineTypePredicates(typePredicates, asTypePredicate(predicate)),
            combineMappers(resultMappers, mapperToUseIfMatch)
        )
    },
    matchesType<NewInputType, NewOutputType>(predicate:TypePredicate<NewInputType,any>, mapperToUseIfMatch:Mapper<any,NewOutputType>): ISwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType> {
        return NonEmptySwitch<PossibleInputTypes | NewInputType, PossibleOutputTypes | NewOutputType>(
            combineTypePredicates(typePredicates, predicate),
            combineMappers(resultMappers, mapperToUseIfMatch)
        )
    },
    get<ActualInputType extends PossibleInputTypes>(input:ActualInputType):Maybe<PossibleOutputTypes> {
        return zip(typePredicates, resultMappers)
            .flatMap(zipped => first(zipped, ([a,]) => a(input) == true))
            .map(([,b]) => b(input));
    },
    getOrDefault<ActualInputType extends PossibleInputTypes, TypeOfDefaultValue>(input:ActualInputType, defaultValue:TypeOfDefaultValue):PossibleOutputTypes | TypeOfDefaultValue {
        return this.get(input).valueOrDefault(defaultValue)
    }
})