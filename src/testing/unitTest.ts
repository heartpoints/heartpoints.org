import { Mapper } from "../utils/axioms/Mapper"

type AssertionResult<P, R> = Expectable<P, R> & WithGivenParameter<P, R> & WithForFunction

type PropertyTest<P, R, RofP> = {
    equals(other:RofP):AssertionResult<P, R>
}

type ReturnValue<P, R> = {
    [Prop in keyof R]: PropertyTest<P, R, R[Prop]>
}

type Expectable<P, R> = {
    expect: {
        returnValue: ReturnValue<P, R>
    }
}

type GivenParameter<P, R> = (p:P) => Expectable<P, R>

type WithGivenParameter<P, R> = {
    givenParameter: GivenParameter<P, R>
}

type ForFunction = <P, R>(someFunction:Mapper<P, R>) => WithGivenParameter<P, R>

type UnitTest = AssertionResult<any, any>

type WithForFunction = {
    forFunction: ForFunction
}

type NewUnitTest = WithForFunction

export type UnitTestDefinition = (newUnitTest:NewUnitTest) => UnitTest