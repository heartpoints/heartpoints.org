import { GivenParameter } from "./GivenParameter";
export type WithGivenParameter<P, R> = {
    givenParameter: GivenParameter<P, R>;
};
