import { callWith } from "./callWith";
import { Consumer } from "../axioms/Consumer";

export type CallEachWith = <T>(funcs:Array<Consumer<T>>, parameter:T) => void
export const callEachWith: CallEachWith = (funcs, parameter) => funcs.forEach(callWith(parameter));
