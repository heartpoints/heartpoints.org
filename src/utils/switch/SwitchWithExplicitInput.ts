import { ISwitchWithEarlyInput } from "./ISwitchWithEarlyInput";
import { SwitchWithExplicitInputImpl } from "./SwitchWithExplicitInputImpl";
export const SwitchWithExplicitInput = <T>(input: T): ISwitchWithEarlyInput<T, never> => {
    return SwitchWithExplicitInputImpl(input, []);
};
