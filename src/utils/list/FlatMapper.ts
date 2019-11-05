import { IList } from "./IList";
export type FlatMapper<T, S> = (i: T) => IList<S>;
