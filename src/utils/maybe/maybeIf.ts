import { None } from "./None";
import { Some } from "./Some";
import { IMaybe } from "./IMaybe";
export const maybeIf = <T>(predicate: boolean, valueIfTrue: T): IMaybe<T> => predicate ? Some(valueIfTrue) : None;
