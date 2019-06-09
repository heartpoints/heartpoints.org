import { ListOfLiterals } from "../utils/list";
import { theExpression } from "./expect";
import { expect } from "chai";

describe("List", () => {
    const plus = (a,b) => a + b
    const not = f => x => !f(x)
    const isEven = a => a % 2 == 0
    const isOdd = not(isEven)
    theExpression(() => ListOfLiterals().reduce(plus, 0)).shouldEqual(0)
    theExpression(() => ListOfLiterals(1,2,3).reduce(plus, 0)).shouldEqual(6)
    theExpression(() => ListOfLiterals(1,2,3).asArray).shouldDeepEqual([1,2,3])
    theExpression(() => ListOfLiterals(1,2).push(3).asArray).shouldDeepEqual([1,2,3])
    theExpression(() => ListOfLiterals(1,2,3).head.value).shouldEqual(1)
    theExpression(() => ListOfLiterals(1,2,3).first(isEven).value).shouldEqual(2)
    theExpression(() => ListOfLiterals(1,2,3).first(isOdd).value).shouldEqual(1)
    theExpression(() => ListOfLiterals(1,5,3).first(isEven).isNone).shouldEqual(true)
    theExpression(() => ListOfLiterals(1,5,3).reduce((a, b) => a - b, 0)).shouldEqual(-9)
    theExpression(() => [...ListOfLiterals(1,2,3), 4, 5]).shouldDeepEqual([1,2,3,4,5])
})