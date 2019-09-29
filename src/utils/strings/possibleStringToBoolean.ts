import { possibleStringToMaybeBoolean } from "./possibleStringToMaybeBoolean";
export const possibleStringToBoolean = (s: string | undefined, valueIfMissingOrUnclear: boolean) => possibleStringToMaybeBoolean(s).valueOrDefault(valueIfMissingOrUnclear);
