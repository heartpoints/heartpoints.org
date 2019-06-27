import { Provider } from "../axioms/Provider";
import { None } from "./None";
import { Some } from "./Some";
import { IMaybe } from "./IMaybe";
export const maybeIfLazy = <T>(predicate: boolean, valueProviderIfTrue: Provider<T>): IMaybe<T> => predicate ? Some(valueProviderIfTrue()) : None;
