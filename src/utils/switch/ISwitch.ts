import { ISwitchWithLateInput } from "./ISwitchWithLateInput";
import { ISwitchWithEarlyInput } from "./ISwitchWithEarlyInput";
import { ISwitchWithoutInput } from "./ISwitchWithoutInput";

export interface ISwitch {
    when<T>(value: T): ISwitchWithEarlyInput<T, never>;
    withoutInput: ISwitchWithoutInput<never>;
    that: ISwitchWithLateInput<never, never>;
}
