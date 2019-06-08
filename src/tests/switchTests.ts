import { when, whenValues, then } from "./expect";
import * as _ from "lodash";
import { expect } from "chai";
import { Switch } from "../utils/Switch";

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
            then(() => theSwitch.result.value).shouldEqual("swenu!!!")
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
            then(() => theSwitch.result.value).shouldBehaveAsFollows(
                result => expect(result).to.deep.equal([1,2,3])
            )
        )
    
        const switchWithoutInputCases = switchWithoutInput
            .case(false, () => 3)
            .matchesLazy(() => false, () => "tommy")
            .caseLazy(4 == 4, () => [2,3,4])
    
        whenValues({theSwitch: switchWithoutInputCases}, ({theSwitch}) =>
            then(() => theSwitch.result.value).shouldBehaveAsFollows(
                result => expect(result).to.deep.equal([2,3,4])
            )
        )
    })
    describe(".that", () => {
        const switchThat = Switch.that
        when("no matches / cases are added", () => {
            then(()=>switchThat.resultWhen(5 as never).isNone).shouldBeTrue()
        });
    
        const switchWithOnlyCases = () => switchThat
            .case("myes", 6)
            .case(7, "myrrr")
            .case(true, false);
    
        whenValues({theSwitch: switchWithOnlyCases}, ({theSwitch}) => {
            whenValues({inputValue: 9}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).hasValue).shouldBeFalse()
            })
    
            whenValues({inputValue: 7}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldEqual("myrrr")
            })
        });
    
        const switchWithLazyCase = () => switchThat
            .caseLazy("tommy", () =>true)
            .caseLazy(true, () =>"myes")
    
        whenValues({theSwitch: switchWithLazyCase}, ({theSwitch}) => {
            whenValues({inputValue: "nonMatchingInputValue"}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).hasValue).shouldBeFalse()
            })
    
            whenValues({inputValue: "tommy"}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldBeTrue()
            })
    
            whenValues({inputValue: true}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldEqual("myes")
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
                then(() => theSwitch().resultWhen(inputValue).hasValue).shouldBeFalse()
            })
    
            whenValues({inputValue: 6}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldEqual("oooo even number")
            })
    
            whenValues({inputValue: "tommy"}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldEqual("yay tommy")
            })
    
            whenValues({inputValue: 7}, ({inputValue}) => {
                then(() => theSwitch().resultWhen(inputValue).value).shouldEqual("oooo odd number 7")
            })
        });
    })
})