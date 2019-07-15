import { nestedField } from "./nestedField";
import { FieldBinderTransformer } from "./FieldBinderTransformer";

export const nestedFieldNamed = 
    <S, K extends keyof S, V>(name: K): FieldBinderTransformer<S, S[K], V> =>
    nestedField(
        s => s[name],
        (s, v) => ({ ...s, [name]: v})
    )
