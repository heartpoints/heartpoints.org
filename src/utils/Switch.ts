export const Switch = <T, S>(expression:T, ...cases:Array<CaseLike<T, S>>):S => {
    const firstMatchingCase = cases.find(c => c.matches(expression));
    if(!firstMatchingCase) throw new Error(`No cases matched expression with value ${expression}`);
    return firstMatchingCase.resolve(expression);
}

export interface CaseLike<T, S> {
    matches(t?:T):boolean,
    resolve(t?:T):S
}

export const Case = <T, S>(condition:T, result:S) => ({
    matches: t => t == condition,
    resolve: () => result
});

export const CaseLazy = <T, S>(condition:T, resolve:(t?:T)=>S) => ({
    matches: t => t == condition,
    resolve
});

export const Match = <T, S>(matcher:(t:T)=>boolean, result:S) => ({
    matches: matcher,
    resolve: () => result
});

export const MatchLazy = <T, S>(matcher:(t:T)=>boolean, resolve:(t?:T)=>S) => ({
    matches: matcher,
    resolve
});

export const Default = <S>(result:S) => ({
    matches: () => true,
    resolve: () => result
});

export const DefaultLazy = <T, S>(resolve:(t?:T) => S) => ({
    matches: () => true,
    resolve
});