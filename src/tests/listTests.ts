import { List } from "../utils/list";
import { itExpects } from "./expect";


describe(List.name, () => {
    const plus = (a,b) => a + b
    itExpects(() => List().reduce(plus, 0)).toEqual(0);
    itExpects(() => List(1,2,3).reduce(plus, 0)).toEqual(6);
})