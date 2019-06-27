import { Equatable } from "./Equatable";

export interface ISet {
    toString(): string;
    includes(possibleMember: Equatable): boolean;
    union(anotherSet: ISet): ISet;
    intersect(anotherSet: ISet): ISet;
    negation: ISet;
}
