import { ISet } from "./ISet";
import { Equatable } from "./Equatable";
import { intersectionOfTwoSets } from "./intersectionOfTwoSets";
import { negationOfSet } from "./negationOfSet";

export const unionOfTwoSets = (set1: ISet, set2: ISet): ISet => {
    const result = {
        toString: () => `(${set1} U ${set2})`,
        includes: (a: Equatable) => set1.includes(a) || set2.includes(a),
        union: (anotherSet) => unionOfTwoSets(result, anotherSet),
        intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
        get negation() { return negationOfSet(result); }
    };
    return result;
};
