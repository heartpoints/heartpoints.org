import { expect } from "chai";

export const when = (description, block) => context(`when ${description}`, block);
export const whenValues = (obj, block) => context(`when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`, block);
const whenSpacing = "             ";

export const itExpects = (resultProvider) => (
    { 
        toEqual: expectedValue => 
            it(`it expects ${resultProvider} to be ${expectedValue}`, () =>
                expect(resultProvider()).to.equal(expectedValue)
            )
    }
);

export const objectAsKeyValueString = (obj) => 
    Object
        .entries(obj)
        .map(([k,v]) => `${whenSpacing}${k} = ${v}`)
        .join("\n")