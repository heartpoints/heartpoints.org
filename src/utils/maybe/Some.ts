import { None } from "./None";
import { MaybeFlatmapper } from "./MaybeFlatmapper";
import { IMaybe } from "./IMaybe";
export const Some = <T>(value: T): IMaybe<T> => ({
    map: <S>(f: (t: T) => S) => Some(f(value)),
    flatMap: <S>(f: MaybeFlatmapper<T, S>): IMaybe<S> => {
        const maybeResult = f(value);
        return maybeResult.hasValue ? Some(maybeResult.value) : None;
    },
    value,
    hasValue: true,
    valueOrDefault: () => value,
    isNone: false,
    ifElse: valueIfSomeObject => valueIfSomeObject,
});
