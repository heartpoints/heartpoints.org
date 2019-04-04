import { expect } from "chai";
import { Provider } from "../utils/provider";
import { Consumer } from "../utils/consumer";

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

export const then = <T>(resultProvider:Provider<T>) => (
    { 
        shouldEqual: (expectedValue) => 
            it(`then ${resultProvider} should be ${expectedValue}`, () =>
                expect(resultProvider()).to.equal(expectedValue)
            ),
        shouldBeFalse: () => it(`then ${resultProvider} should be false`, () =>
            expect(resultProvider()).to.be.false
        ),
        shouldBeTrue: () => it(`then ${resultProvider} should be true`, () =>
            expect(resultProvider()).to.be.true
        ),
        shouldEventually: (block:Consumer<T>) =>
            it(`then ${resultProvider} should eventually behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, async () => block(await resultProvider())),

        shouldBehaveAsFollows: (block:Consumer<T>) =>
            it(`then ${resultProvider} should behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, () => block(resultProvider())),
    }
);

export const objectAsKeyValueString = (obj) => 
    Object
        .entries(obj)
        .map(([k,v]) => `${whenSpacing}${k} = ${v}`)
        .join("\n")