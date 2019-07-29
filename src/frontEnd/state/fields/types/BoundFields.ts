import { Dictionary } from "lodash";
import { Field } from "./Field";

export type BoundFields<T> = Dictionary<Field<T>>;
