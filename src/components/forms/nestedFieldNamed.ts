import { nestedField } from "./nestedField";
import { FieldBinderTransformer } from "./FieldBinderTransformer";

// export const nestedFieldNamed = 
//     <S, K extends keyof S, V>(name: K):FieldBinder<S, S[K]> => 
//     nestedField<S, S[K], V>(
//         (s: S):S[K] => s[name],
//         (s:S, value:S[K]):S => ({ ...s, [name]: value })
//     )

export const nestedFieldNamed = 
    <S, K extends keyof S, V>(name: K): FieldBinderTransformer<S, S[K], V> =>
    nestedField(
        s => s[name],
        (s, v) => ({ ...s, [name]: v})
    )
