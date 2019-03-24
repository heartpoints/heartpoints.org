import { Maybe, Some, None } from "../tests/maybe";

export const Switch = <T, S>(expression:T, ...cases:Array<Case<T, S>>):Maybe<S> => {
    const firstMatchingCase = cases.find(c => c.matches(expression));
    return firstMatchingCase
        ? Some(firstMatchingCase.resolve(expression))
        : None;
}

export interface Case<T, S> {
    matches(t?:T):boolean,
    resolve(t?:T):S
}

export const Case = <T, S>(condition:T, result:S) => ({
    matches: t => t == condition,
    resolve: Constant(result),
});

export const CaseLazy = <T, S>(condition:T, resolve:(t?:T)=>S) => ({
    matches: t => t == condition,
    resolve
});

export const Match = <T, S>(matcher:(t:T)=>boolean, result:S) => ({
    matches: matcher,
    resolve: Constant(result),
});

export const MatchLazy = <T, S>(matcher:(t:T)=>boolean, resolve:(t?:T)=>S) => ({
    matches: matcher,
    resolve
});

export const Default = <S>(result:S) => ({
    matches: True,
    resolve: Constant(result),
});

export const DefaultLazy = <T, S>(resolve:(t?:T) => S) => ({
    matches: True,
    resolve
});

export const True = () => true;
export const Constant = <T>(c:T) => () => c;