import { reduceMaybe } from "./reduceMaybe";
import { Some } from "./Some";
import { then } from "../../testing/then";
import { whenValues } from "../../testing/whenValues";
import { add3ToEvens } from "../../testing/add3ToEvens";
import { doubleOdds } from "../../testing/doubleOdds";

describe("Maybe", () => {
    whenValues({add3ToEvens, doubleOdds}, () => {
        then(
            () => Some(5).flatMap(doubleOdds).flatMap(add3ToEvens).valueOrDefault(2)
        ).shouldEqual(13);

        then(
            () => reduceMaybe(5, doubleOdds, add3ToEvens, doubleOdds, add3ToEvens).valueOrDefault(2)
        ).shouldEqual(29);
    });
})