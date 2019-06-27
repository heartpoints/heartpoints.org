import { SwitchWithExplicitInput } from "./SwitchWithExplicitInput";
import { EmptySwitchWithoutInput } from "./EmptySwitchWithoutInput";
import { EmptySwitch } from "./EmptySwitch";
import { ISwitch } from "./ISwitch";

export const Switch: ISwitch = {
    when: SwitchWithExplicitInput,
    withoutInput: EmptySwitchWithoutInput(),
    that: EmptySwitch()
};
