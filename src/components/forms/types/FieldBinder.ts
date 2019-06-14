import { Consumer } from "../../../utils/consumer";
import { Field } from "./Field";
export type FieldBinder<S, T> = (state: S, renderApp: Consumer<S>) => Field<T>;
