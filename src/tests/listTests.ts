import { ListOfLiterals } from "../utils/list";
import { then } from "./expect";
import { expect } from "chai";

describe(ListOfLiterals.name, () => {
    const plus = (a,b) => a + b
    const isEven = a => a % 2 == 0
    then(() => ListOfLiterals().reduce(plus, 0)).shouldEqual(0)
    then(() => ListOfLiterals(1,2,3).reduce(plus, 0)).shouldEqual(6)
    then(() => ListOfLiterals(1,2,3).first(isEven).value).shouldEqual(2)
    then(() => ListOfLiterals(1,5,3).first(isEven).isNone).shouldEqual(true)
    then(() => [...ListOfLiterals(1,2,3), 4, 5]).shouldBehaveAsFollows(
        result => expect(result).to.deep.equal([1,2,3,4,5])
    )
})