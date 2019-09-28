import { Switch } from "../switch/Switch";
import { IMaybe } from "../maybe/IMaybe";

export type StringToMaybeBoolean = (s:string) => IMaybe<boolean>
export const stringToMaybeBoolean: StringToMaybeBoolean = (s: string) => Switch.when(s.toLowerCase().trim())
    .matches(s => s === "true", true)
    .matches(s => s === "false", false)
    .result;
