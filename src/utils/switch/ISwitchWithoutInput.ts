import { ICaseMatchWithoutInput } from "./ICaseMatchWithoutInput";
import { ISwitchResult } from "./ISwitchResult";
export interface ISwitchWithoutInput<V> extends ICaseMatchWithoutInput<V>, ISwitchResult<V> {
}
