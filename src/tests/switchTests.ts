import { when, whenValues, itIsExpected } from "./expect";
import * as _ from "lodash";
import { expect } from "chai";
import { Switch } from "../utils/Switch";
import { None } from "../utils/maybe";

describe("Switch", () => {
    describe(".when(value)", () => {
        const input = "tommy"
        const switchWhenInputIsTommy = Switch.when(input);
    
        when("I have an empty switchWhenInputIsTommy", () => {
            it("yields None", () => {
                expect(switchWhenInputIsTommy.result.isNone).to.be.true
            });
        });
    
        const switchWhenInputIsTommyMatchesLazy = switchWhenInputIsTommy
            .case("mike", 9)
            .caseLazy("swenu", () => true)
            .matches(i => i == "hewwo", "nope")
            .matchesLazy(i => i == input, () => "swenu!!!")
    
        whenValues({theSwitch: switchWhenInputIsTommyMatchesLazy}, ({theSwitch}) =>
            itIsExpected(() => theSwitch.result.value).toEqual("swenu!!!")
        )
    });
    describe(".withoutInput", () => {
        const switchWithoutInput = Switch.withoutInput
        when("I have an empty SwitchWithoutInput", () => {
            it("yields None", () => {
                expect(switchWithoutInput.result.isNone).to.be.true
            });
        });
    
        const switchWithoutInputMatchesLazy = switchWithoutInput
            .matchesLazy(() => false, () => 3)
            .matchesLazy(() => false, () => "tommy")
            .matchesLazy(() => true, () => [1,2,3])
    
        whenValues({theSwitch: switchWithoutInputMatchesLazy}, ({theSwitch}) =>
            itIsExpected(() => theSwitch.result.value).toBehaveAsFollows(
                result => expect(result).to.deep.equal([1,2,3])
            )
        )
    
        const switchWithoutInputCases = switchWithoutInput
            .case(false, () => 3)
            .matchesLazy(() => false, () => "tommy")
            .caseLazy(4 == 4, () => [2,3,4])
    
        whenValues({theSwitch: switchWithoutInputCases}, ({theSwitch}) =>
            itIsExpected(() => theSwitch.result.value).toBehaveAsFollows(
                result => expect(result).to.deep.equal([2,3,4])
            )
        )
    })
    describe(".that", () => {
        const switchThat = Switch.that
        when("no matches / cases are added", () => {
            itIsExpected(()=>switchThat.resultWhen(5 as never).isNone).toBeTrue()
        });
    
        const switchWithOnlyCases = () => switchThat
            .case("myes", 6)
            .case(7, "myrrr")
            .case(true, false);
    
        whenValues({theSwitch: switchWithOnlyCases}, ({theSwitch}) => {
            whenValues({inputValue: 9}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).hasValue).toBeFalse()
            })
    
            whenValues({inputValue: 7}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toEqual("myrrr")
            })
        });
    
        const switchWithLazyCase = () => switchThat
            .caseLazy("tommy", () =>true)
            .caseLazy(true, () =>"myes")
    
        whenValues({theSwitch: switchWithLazyCase}, ({theSwitch}) => {
            whenValues({inputValue: "nonMatchingInputValue"}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).hasValue).toBeFalse()
            })
    
            whenValues({inputValue: "tommy"}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toBeTrue()
            })
    
            whenValues({inputValue: true}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toEqual("myes")
            })
        });
    
        interface GeneralInterface {
            generalProperty:number,
        }
        interface SpecificInterface extends GeneralInterface {
            specificProperty:SpecialType;
        }
        interface SpecialType {}
    
        const isSpecificInterface = (g:GeneralInterface): g is SpecificInterface =>
            (g as SpecificInterface).specificProperty !== undefined
    
        const switchWithMatchesOnly = () => switchThat
            .matches((v:string) => v == "tommy", "yay tommy")
            .matches((v:number) => v % 2 == 0, "oooo even number")
            .matchesLazy((v:number) => v % 2 == 1, odd => `oooo odd number ${odd}`)
            .matchesType(isSpecificInterface, specific => specific.specificProperty)
    
        whenValues({theSwitch: switchWithMatchesOnly}, ({theSwitch}) => {
            whenValues({inputValue: "sidfusidufhsidu"}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).hasValue).toBeFalse()
            })
    
            whenValues({inputValue: 6}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toEqual("oooo even number")
            })
    
            whenValues({inputValue: "tommy"}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toEqual("yay tommy")
            })
    
            whenValues({inputValue: 7}, ({inputValue}) => {
                itIsExpected(() => theSwitch().resultWhen(inputValue).value).toEqual("oooo odd number 7")
            })
        });
    })
})