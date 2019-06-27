import { expect } from "chai";
import { Provider } from "../utils/axioms/Provider";
import { Consumer } from "../utils/axioms/Consumer";

export const describeFunction = (functionReference, block) => describe(`function ${functionReference.name}`, block);
export const when = (description, block) => context(`when ${description}`, block);
export const and = when;
export const whenValues = <T>(obj:T, block:(t:T)=>void) => context(`when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`, () => block(obj));
const whenSpacing = "             ";

export interface ThenLike<T> {
    shouldEqual(expectedValue:T):void
    shouldBeFalse():void
    shouldBeTrue():void
    shouldBehaveAsFollows(block:Consumer<T>):void
    shouldEventually(block:Consumer<T>):void
}

const thenable = (prexixWord:string) => <T>(resultProvider:Provider<T>) => (
    { 
        shouldEqual: (expectedValue) => 
            it(`${prexixWord} ${resultProvider} should be ${expectedValue}`, () =>
                expect(resultProvider()).to.equal(expectedValue)
            ),
        shouldBeFalse: () => it(`${prexixWord} ${resultProvider} should be false`, () =>
            expect(resultProvider()).to.be.false
        ),
        shouldBeTrue: () => it(`${prexixWord} ${resultProvider} should be true`, () =>
            expect(resultProvider()).to.be.true
        ),
        shouldDeepEqual: (expectedValue) => it(`${prexixWord} ${resultProvider} should deep equal`, () =>
            expect(resultProvider()).to.deep.equal(expectedValue)
        ),
        shouldEventually: (block:Consumer<T>) => it(
            `${prexixWord} ${resultProvider} should eventually behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`,
            async () => block(await resultProvider())
        ),
        should: (block:Consumer<T>) => it(
            `${prexixWord} ${resultProvider} should behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`,
            () => block(resultProvider())
        )
    }
);

export const then = thenable("then")
export const theExpression = thenable("the expression");

export const objectAsKeyValueString = (obj) => 
    Object
        .entries(obj)
        .map(([k,v]) => `${whenSpacing}${k} = ${v}`)
        .join("\n")