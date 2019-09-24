import { stringToMaybeBoolean } from "./stringToMaybeBoolean";
import { IMaybe } from "../maybe/IMaybe";

export type MaybeStringToMaybeBoolean = (s:IMaybe<string>) => IMaybe<boolean>
export const maybeStringToMaybeBoolean: MaybeStringToMaybeBoolean = s => s.flatMap(stringToMaybeBoolean);
