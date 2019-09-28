import { IMaybe } from "../../utils/maybe/IMaybe";
import { Maybes } from "../../utils/maybe/Maybes";
export type AllMaybes = <T>(maybes: Maybes<T>) => IMaybe<T>;
