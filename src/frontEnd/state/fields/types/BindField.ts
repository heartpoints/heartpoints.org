import { FieldBinder } from "./FieldBinder";
import { Field } from "./Field";

export type BindField<S, T> = (fieldBinder: FieldBinder<S, T>) => Field<T>;
