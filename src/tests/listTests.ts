import { ListOfLiterals } from "../utils/list";
import { theExpression } from "./expect";
import { expect } from "chai";

describe("List", () => {
    const plus = (a,b) => a + b
    const isEven = a => a % 2 == 0
    theExpression(() => ListOfLiterals().reduce(plus, 0)).shouldEqual(0)
    theExpression(() => ListOfLiterals(1,2,3).reduce(plus, 0)).shouldEqual(6)
    theExpression(() => ListOfLiterals(1,2,3).first(isEven).value).shouldEqual(2)
    theExpression(() => ListOfLiterals(1,5,3).first(isEven).isNone).shouldEqual(true)
    theExpression(() => [...ListOfLiterals(1,2,3), 4, 5]).shouldBehaveAsFollows(
        result => expect(result).to.deep.equal([1,2,3,4,5])
    )
})