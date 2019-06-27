import { Equatable } from "./Equatable";
import { ISet } from "./ISet";
import { intersectionOfTwoSets } from "./intersectionOfTwoSets";
import { negationOfSet } from "./negationOfSet";
import { unionOfTwoSets } from "./unionOfTwoSets";

export const setContainingOneElement = (element: Equatable): ISet => {
    const result = {
        toString: () => `{ ${element.toString()} }`,
        includes: (a) => a.equals(element),
        union: (anotherSet) => unionOfTwoSets(result, anotherSet),
        intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
        get negation() { return negationOfSet(result); }
    };
    return result;
};
