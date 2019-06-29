import { field } from "./field";

export const fieldNamed = 
    <S, K extends keyof S>(fieldName: K, placeholder: string) => 
    field(
        (s:S):S[K] => s[fieldName], 
        (s, value) => ({ ...s, [fieldName]: value }), 
        placeholder
    )