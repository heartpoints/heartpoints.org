import { FieldBinder } from "./types/FieldBinder";
export type FieldBinderTransformer<S, T, V> = (f: FieldBinder<T, V>) => FieldBinder<S, V>;
