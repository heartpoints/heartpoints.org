import { Consumer } from "../axioms/Consumer";

export type CallWith = <T>(eventualParameter:T) => (functionToCall:Consumer<T>) => void;

export const callWith:CallWith = 
    <T>(eventualParameter:T) => 
    (functionToCall:Consumer<T>) => 
    functionToCall(eventualParameter);
