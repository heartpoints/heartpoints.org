import { NoneType } from "./NoneType";
import { True } from "../axioms/true";
import { False } from "../axioms/False";
import { Provider } from "../axioms/Provider";

export const None: NoneType = {
    map: (f) => None,
    flatMap: (f) => None,
    mapOrDefault: (_, d) => d,
    get value(): never { throw new Error("Cannot get value for type none"); }, //todo: remove when ready to handle all the breaking stuff in restguru!
    hasValue: False,
    valueOrDefault: <S>(someDefault: S): S => someDefault,
    isNone: True,
    ifElse: (_, valueIfNone) => valueIfNone,
    valueOr: <T>(defaultProducer:Provider<T>) => defaultProducer(),
}