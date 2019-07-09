import { Consumer } from "../../../utils/axioms/Consumer";
import { Field } from "./Field";

export type FieldBinder<S, T> = (state: S, renderApp: Consumer<S>) => Field<T>
