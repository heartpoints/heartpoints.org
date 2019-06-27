import { ISet } from "./ISet";
import { intersectionOfTwoSets } from "./intersectionOfTwoSets";
import { unionOfTwoSets } from "./unionOfTwoSets";

export const negationOfSet = (set: ISet): ISet => {
    const result = {
        toString: () => `(! ${set})`,
        includes: (a) => !set.includes(a),
        union: (anotherSet) => unionOfTwoSets(result, anotherSet),
        intersect: (anotherSet) => intersectionOfTwoSets(result, anotherSet),
        get negation() { return set; }
    };
    return result;
};
