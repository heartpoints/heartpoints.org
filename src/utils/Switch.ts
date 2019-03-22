export const Switch = <T, S>(expression:T, ...cases:Array<CaseLike<T, S>>):S => {
    const firstMatchingCase = cases.find(c => c.matches(expression));
    if(!firstMatchingCase) throw new Error(`No cases matched expression with value ${expression}`);
    return firstMatchingCase.resolve(expression);
}

export const TypeSwitch = <T1, T2 extends T1, S>(t1:T1, ...cases:Array<TypeCaseLike<T1, T2, S>>):S => {
    const firstMatchingCase = cases.find(c => c.matches(t1));
    if(!firstMatchingCase) throw new Error(`No typecases matched expression with value ${t1}`);
    return firstMatchingCase.resolve(t1 as T2);
}

interface TypeCaseLike<T1, T2 extends T1, S> {
    matches(t1?:T1): t1 is T2,
    resolve(t2?:T2):S
}

export const TypeMatch = <T1, T2 extends T1, S>(typePredicate:(t1:T1) => t1 is T2, mapToResult:(t2:T2) => S) => ({
    matches: typePredicate,
    resolve: (t2:T2) => mapToResult(t2)
})

export const TypeDefault = <T1, T2, S>(result:S) => ({
    matches: TrueType,
    resolve: Constant(result),
})

export interface CaseLike<T, S> {
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

export const TrueType = <T1, T2 extends T1>(t1:T1):t1 is T2 => true;
export const True = () => true;
export const Constant = <T>(c:T) => () => c;