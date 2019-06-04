import { ListOfLiterals } from "../utils/list";
import { itIsExpected } from "./expect";
import { expect } from "chai";

describe(ListOfLiterals.name, () => {
    const plus = (a,b) => a + b
    const isEven = a => a % 2 == 0
    itIsExpected(() => ListOfLiterals().reduce(plus, 0)).toEqual(0)
    itIsExpected(() => ListOfLiterals(1,2,3).reduce(plus, 0)).toEqual(6)
    itIsExpected(() => ListOfLiterals(1,2,3).first(isEven).value).toEqual(2)
    itIsExpected(() => ListOfLiterals(1,5,3).first(isEven).isNone).toEqual(true)
    itIsExpected(() => [...ListOfLiterals(1,2,3), 4, 5]).toBehaveAsFollows(
        result => expect(result).to.deep.equal([1,2,3,4,5])
    )
})