import { FieldReader } from "./FieldReader";
import { FieldSetter } from "./FieldSetter";
import { FieldDescription } from "./FieldDescription";

export type Field<T> = FieldReader<T> & FieldSetter<T> & FieldDescription