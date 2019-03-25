import { Some, None, reduceMaybe } from "../utils/maybe";
import { whenValues, itExpects } from "./expect";

describe("Maybe", () => {
    const doubleOdds = (x:number) => x % 2 == 1 ? Some(x * 2) : None
    const add3ToEvens = (x:number) => x % 2 == 0 ? Some(x + 3) : None
    whenValues({add3ToEvens, doubleOdds}, () => {
        itExpects(
            () => Some(5).flatMap(doubleOdds).flatMap(add3ToEvens).valueOrDefault(2)
        ).toEqual(13);

        itExpects(
            () => reduceMaybe(5, doubleOdds, add3ToEvens, doubleOdds, add3ToEvens).valueOrDefault(2)
        ).toEqual(29);
    });
})