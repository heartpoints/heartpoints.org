import { expect } from "chai";
import { Provider } from "../utils/axioms/Provider";
import { Consumer } from "../utils/axioms/Consumer";
export const thenable = (prexixWord: string) => <T>(resultProvider: Provider<T>) => ({
    shouldEqual: (expectedValue) => it(`${prexixWord} ${resultProvider} should be ${expectedValue}`, () => expect(resultProvider()).to.equal(expectedValue)),
    shouldBeFalse: () => it(`${prexixWord} ${resultProvider} should be false`, () => expect(resultProvider()).to.be.false),
    shouldBeTrue: () => it(`${prexixWord} ${resultProvider} should be true`, () => expect(resultProvider()).to.be.true),
    shouldDeepEqual: (expectedValue) => it(`${prexixWord} ${resultProvider} should deep equal`, () => expect(resultProvider()).to.deep.equal(expectedValue)),
    shouldEventually: (block: Consumer<T>) => it(`${prexixWord} ${resultProvider} should eventually behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, async () => block(await resultProvider())),
    shouldMeetExpectations: (block: Consumer<T>) => it(`${prexixWord} ${resultProvider} should behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, () => block(resultProvider()))
});
