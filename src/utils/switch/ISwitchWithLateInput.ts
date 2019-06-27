import { IMaybe } from "../maybe/IMaybe";
import { ICaseMatch } from "./ICaseMatch";

export interface ISwitchWithLateInput<T, V> extends ICaseMatch<T, V> {
    resultWhen<Q extends T>(input: Q): IMaybe<V>;
}
