import { IMaybe } from "../../utils/maybe/IMaybe";
import { Maybes } from "./Maybes";
export type AllMaybes = <T>(maybes: Maybes<T>) => IMaybe<T>;
