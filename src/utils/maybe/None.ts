import { NoneType } from "./NoneType";
export const None: NoneType = {
    map: (f) => None,
    flatMap: (f) => None,
    get value(): never { throw new Error("Cannot get value for type none"); },
    hasValue: false,
    valueOrDefault: <S>(someDefault: S): S => someDefault,
    isNone: true,
    ifElse: (_, valueIfNone) => valueIfNone,
};
