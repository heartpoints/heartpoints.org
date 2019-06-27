import { ISet } from "./ISet";
import { setOfEverything } from "./setOfEverything";

export const emptySet: ISet = {
    toString: () => `{}`,
    includes: (a) => false,
    union: (anotherSet) => anotherSet,
    intersect: (anotherSet) => emptySet,
    get negation() { return setOfEverything; }
};
