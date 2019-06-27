import { None } from "./None";
import { Some } from "./Some";
import { IMaybe } from "./IMaybe";
export const If = (predicate: Boolean): IMaybe<boolean> => predicate ? Some(true) : None;
