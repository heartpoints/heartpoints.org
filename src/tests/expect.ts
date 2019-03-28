import { expect } from "chai";
import { Provider } from "../utils/provider";
import { Consumer } from "../utils/consumer";

export const when = (description, block) => context(`when ${description}`, block);
export const and = when;
export const whenValues = <T>(obj:T, block:(t:T)=>void) => context(`when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`, () => block(obj));
const whenSpacing = "             ";

export const itExpects = <T>(resultProvider:Provider<T>) => (
    { 
        toEqual: expectedValue => 
            it(`it expects ${resultProvider} to be ${expectedValue}`, () =>
                expect(resultProvider()).to.equal(expectedValue)
            ),
        toBeFalse: () => it(`it expects ${resultProvider} to be false`, () =>
            expect(resultProvider()).to.be.false
        ),
        toBeTrue: () => it(`it expects ${resultProvider} to be true`, () =>
            expect(resultProvider()).to.be.true
        ),
        toBehaveAsFollows: (block:Consumer<T>) =>
            it(`it expects ${resultProvider} to behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, () => block(resultProvider())),
    }
);

export const objectAsKeyValueString = (obj) => 
    Object
        .entries(obj)
        .map(([k,v]) => `${whenSpacing}${k} = ${v}`)
        .join("\n")