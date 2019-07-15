import { FieldBinders } from "./FieldBinders";
import { BoundFields } from "./BoundFields";

export type BindFields<S, T> = (fieldBinders: FieldBinders<S, T>) => BoundFields<T>;
