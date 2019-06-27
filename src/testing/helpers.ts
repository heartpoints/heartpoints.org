import { Some } from "../utils/maybe/Some";
import { None } from "../utils/maybe/None";

export const doubleOdds = (x:number) => x % 2 == 1 ? Some(x * 2) : None
export const add3ToEvens = (x:number) => x % 2 == 0 ? Some(x + 3) : None