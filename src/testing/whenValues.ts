import { Consumer } from "../utils/axioms/Consumer";
import { whenTextFromObject } from "./whenTextFromObject";

export const whenValues =
    <T>(obj: T, block: Consumer<T>) => 
    context(whenTextFromObject(obj), () => block(obj));
