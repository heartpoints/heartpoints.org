import { Maybe } from "../maybe/maybe";
import { ICaseMatch } from "./ICaseMatch";

export interface ISwitchWithLateInput<T, V> extends ICaseMatch<T, V> {
    resultWhen<Q extends T>(input: Q): Maybe<V>;
}
