import { FieldBinder } from "./FieldBinder";
import { Dictionary } from "lodash";

export type FieldBinders<S, T> = Dictionary<FieldBinder<S, T>>
