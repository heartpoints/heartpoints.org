import { first } from "../list/first";
import { MaybeFlatmapper } from "./MaybeFlatmapper";
import { IMaybe } from "./IMaybe";
export const firstSuccessfulMapResult = <T, S extends T>(ts: T[], f: MaybeFlatmapper<T, S>): IMaybe<S> => {
    return first(ts, t => f(t).hasValue).flatMap(t => f(t));
};
