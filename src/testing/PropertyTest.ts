import { AssertionResult } from "./AssertionResult";
export type PropertyTest<P, R, RofP> = {
    equals(other: RofP): AssertionResult<P, R>;
};
