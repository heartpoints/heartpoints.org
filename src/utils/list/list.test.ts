import { ListOfLiterals } from "./ListOfLiterals";
import { theExpression } from "../../testing/theExpression";
import { ListOfLists, flatten } from "./IList";
import { EmptyList } from "./EmptyList";

describe("List", () => {
    const plus = (a,b) => a + b
    const not = f => x => !f(x)
    const isEven = a => a % 2 == 0
    const isOdd = not(isEven)

    theExpression(() => ListOfLiterals(1,2,3).map(x => x * 2).asArray).shouldDeepEqual([2,4,6])
    theExpression(() => [1,2,3].map(x => x * 2)).shouldDeepEqual([2,4,6])
    theExpression(() => ListOfLiterals().reduce(plus, 0)).shouldEqual(0)
    theExpression(() => ListOfLiterals(1,2,3).reduce(plus, 0)).shouldEqual(6)
    theExpression(() => ListOfLiterals(1,2,3).asArray).shouldDeepEqual([1,2,3])
    theExpression(() => ListOfLiterals(1,2).push(3).asArray).shouldDeepEqual([1,2,3])
    theExpression(() => ListOfLiterals(1,2,3).head.value).shouldEqual(1)
    theExpression(() => ListOfLiterals(1,2,3).first(isEven).value).shouldEqual(2)
    theExpression(() => ListOfLiterals(1,2,3).first(isOdd).value).shouldEqual(1)
    theExpression(() => ListOfLiterals(1,5,3).first(isEven).isNone()).shouldEqual(true)
    theExpression(() => ListOfLiterals(1,5,3).reduce((a, b) => a - b, 0)).shouldEqual(-9)
    theExpression(() => [...ListOfLiterals(1,2,3), 4, 5]).shouldDeepEqual([1,2,3,4,5])

    describe("append", () => {
        const firstList = ListOfLiterals(1,2,3)
        const secondList = ListOfLiterals(4,5,6)
        theExpression(() => firstList.append(secondList).asArray).shouldDeepEqual([1,2,3,4,5,6])
    });

    describe("join", () => {
        const firstList = ListOfLiterals(1,2,3)
        theExpression(() => firstList.join("-")).shouldEqual("1-2-3")
        theExpression(() => EmptyList.join("-")).shouldEqual("")
    })

    describe("ListOfLists", () => {
        const listOfLists = ListOfLists([
            [1,2,3],
            [4,5,6]
        ])
        theExpression(() => listOfLists.toString()).shouldEqual("[[1, 2, 3], [4, 5, 6]]")
    });

    describe("flatten", () => {
        const listOfLists = ListOfLists([
            [1,2,3],
            [4,5,6]
        ])
        theExpression(() => flatten(listOfLists).asArray).shouldDeepEqual([1,2,3,4,5,6])
    });

    describe("flatMap", () => {
        const multiples = ListOfLiterals(10,100,1000)
        const nums = ListOfLiterals(1,2,3)
        const allProducts = [10,100,1000,20,200,2000,30,300,3000]
        theExpression(() => nums.flatMap(n => multiples.map(m => n * m)).asArray).shouldDeepEqual(allProducts)
    })

}) 