import { Equatable } from "./Equatable";
import { ISet } from "./ISet";
import { negationOfSet } from "./negationOfSet";
import { unionOfTwoSets } from "./unionOfTwoSets";

export const intersectionOfTwoSets = (set1: ISet, set2: ISet): ISet => {
    const result = {
        toString: () => `(${set1} | ${set2})`,
        includes: (a: Equatable) => set1.includes(a) && set2.includes(a),
        union: (anotherSet) => unionOfTwoSets(result, anotherSet),
        intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
        get negation() { return negationOfSet(result); }
    }
    return result;
};
