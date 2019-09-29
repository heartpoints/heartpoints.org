import { expect } from "chai";
import { Provider } from "../utils/axioms/Provider";
import { Consumer } from "../utils/axioms/Consumer";
import { blockText } from "./blockText";
import { shouldBehaveText } from "./shouldBehaveText";
import { shouldEventuallyText } from "./shouldEventuallyText";

export const thenable = (prefixWord: string) => <T>(resultProvider: Provider<T>) => ({
    shouldEqual: (expectedValue) => it(
        `${prefixWord} ${resultProvider} should be ${expectedValue}`, 
        () => expect(resultProvider()).to.equal(expectedValue)
    ),
    shouldBeFalse: () => it(
        `${prefixWord} ${resultProvider} should be false`, 
        () => expect(resultProvider()).to.be.false
    ),
    shouldBeTrue: () => it(
        `${prefixWord} ${resultProvider} should be true`, 
        () => expect(resultProvider()).to.be.true
    ),
    shouldDeepEqual: (expectedValue) => it(
        `${prefixWord} ${resultProvider} should deep equal`, 
        () => expect(resultProvider()).to.deep.equal(expectedValue)
    ),
    shouldEventually: (block: Consumer<T>) => it(
        `${prefixWord} ${resultProvider} ${shouldEventuallyText} ${blockText(block)}\n\n`, 
        async () => block(await resultProvider())
    ),
    shouldMeetExpectations: (block: Consumer<T>) => it(
        `${prefixWord} ${resultProvider} ${shouldBehaveText}:\n\n${blockText(block)}\n\n`, 
        () => block(resultProvider())
    )
});