import { maybe } from "../maybe/maybe";
import { maybeStringToMaybeBoolean } from "./maybeStringToMaybeBoolean";
export const possibleStringToMaybeBoolean = (s: string | undefined) => maybeStringToMaybeBoolean(maybe(s));
