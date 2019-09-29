import { Expectable } from "./Expectable";
export type GivenParameter<P, R> = (p: P) => Expectable<P, R>;
