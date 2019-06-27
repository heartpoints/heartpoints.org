import { ISet } from "./ISet";
import { emptySet } from "./emptySet";

export const setOfEverything: ISet = {
    toString: () => `{ EVERYTHING }`,
    includes: (a) => true,
    union: (anotherSet) => setOfEverything,
    intersect: (anotherSet) => anotherSet,
    get negation() { return emptySet; }
};
