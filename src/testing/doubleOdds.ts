import { Some } from "../utils/maybe/Some";
import { None } from "../utils/maybe/None";
export const doubleOdds = (x: number) => x % 2 == 1 ? Some(x * 2) : None;
