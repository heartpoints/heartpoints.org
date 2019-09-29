import { WithForFunction } from "./WithForFunction";
import { WithGivenParameter } from "./WithGivenParameter";
import { Expectable } from "./Expectable";
export type AssertionResult<P, R> = Expectable<P, R> & WithGivenParameter<P, R> & WithForFunction;
