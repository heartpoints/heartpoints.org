import { Switch } from "../switch/Switch";
import { IMaybe } from "../maybe/IMaybe";

export type StringToMaybeBoolean = (s:string) => IMaybe<boolean>
export const stringToMaybeBoolean: StringToMaybeBoolean = (s: string) => Switch.when(s)
    .matches(s => s.toLowerCase().trim() === "true", true)
    .matches(s => s.toLowerCase().trim() === "false", false)
    .result;
