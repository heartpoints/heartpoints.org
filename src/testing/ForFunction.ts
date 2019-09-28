import { Mapper } from "../utils/axioms/Mapper";
import { WithGivenParameter } from "./WithGivenParameter";
export type ForFunction = <P, R>(someFunction: Mapper<P, R>) => WithGivenParameter<P, R>;
