import { expect } from "chai";

export const when = (description, block) => context(`when ${description}`, block);
export const whenValues = (obj, block) => context(`when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`, block);
const whenSpacing = "             ";

export type VoidFunc<T> = (t:T)=>void;
export type Provider<T> = ()=>T;
export const itExpects = <T>(resultProvider:Provider<T>) => (
    { 
        toEqual: expectedValue => 
            it(`it expects ${resultProvider} to be ${expectedValue}`, () =>
                expect(resultProvider()).to.equal(expectedValue)
            ),
        toBehaveAsFollows: (block:VoidFunc<T>) =>
            it(`it expects ${resultProvider} to behave according to the following block:\n\n${block.toString().replace("\n", "")}\n\n`, () => block(resultProvider())),
    }
);

export const objectAsKeyValueString = (obj) => 
    Object
        .entries(obj)
        .map(([k,v]) => `${whenSpacing}${k} = ${v}`)
        .join("\n")