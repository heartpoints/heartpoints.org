import { lazyField } from "./lazyField";

//todo: figure out how to get the typesafe signatures to work (from caller perspective)
export const lazyFieldNamed = 
    // <S, K extends keyof S>(fieldName: K, placeholder: string) => 
    (fieldName:string, placeholder: string) =>
    // lazyField<S, S[K]>(
    lazyField(
        (s:any) => s[fieldName], 
        (s, value) => ({ ...s, [fieldName]: value }), 
        placeholder
    );