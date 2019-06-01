import { when, whenValues, itExpects } from "./expect";
import * as _ from "lodash";
import { expect } from "chai";
import { Switch, SwitchWithoutInput } from "../utils/Switch";
import { None } from "../utils/Maybe";

describe("SwitchWithoutInput", () => {
    when("I have an empty SwitchWithoutInput", () => {
        const result = SwitchWithoutInput();
        it("yields None", () => {
            expect(result.get().isNone).to.be.true
        });
    });

    when("I have an empty SwitchWithoutInput with default", () => {
        const result = SwitchWithoutInput();
        it("equals the default value", () => {
            itExpects(() => result.getOrDefault(42)).toEqual(42);
        });
    });

    const switchWithoutInputMatchesLazy = SwitchWithoutInput()
        .matchesLazy(() => false, () => 3)
        .matchesLazy(() => false, () => "tommy")
        .matchesLazy(() => true, () => [1,2,3])

    whenValues({theSwitch: switchWithoutInputMatchesLazy}, ({theSwitch}) =>
        itExpects(() => theSwitch.get().value).toBehaveAsFollows(
            result => expect(result).to.deep.equal([1,2,3])
        )
    )

    const switchWithoutInputCases = SwitchWithoutInput()
        .case(false, () => 3)
        .matchesLazy(() => false, () => "tommy")
        .caseLazy(4 == 4, () => [2,3,4])

    whenValues({theSwitch: switchWithoutInputCases}, ({theSwitch}) =>
        itExpects(() => theSwitch.get().value).toBehaveAsFollows(
            result => expect(result).to.deep.equal([2,3,4])
        )
    )
});

describe("Switch", () => {

    when("I have an empty switch", () => {
        const result = Switch();
        it("does not compile", () => {
            expect(() => result.get(5 as never)).to.throw;
        });
    });

    when("I have an empty switch with default", () => {
        const result = Switch();
        it("equals the default value", () => {
            itExpects(() => result.getOrDefault(6 as never, 42)).toEqual(42);
        });
    });

    const switchWithOnlyCases = () => Switch()
        .case("myes", 6)
        .case(7, "myrrr")
        .case(true, false);

    whenValues({theSwitch: switchWithOnlyCases}, ({theSwitch}) => {
        whenValues({inputValue: 9}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: 7}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toEqual("myrrr")
        })

        whenValues({inputValue: 55}, ({inputValue}) => {
            itExpects(() => theSwitch().getOrDefault(inputValue, 42)).toEqual(42)
        })

        whenValues({inputValue: "myes"}, ({inputValue}) => {
            itExpects(() => theSwitch().getOrDefault(inputValue, 42)).toEqual(6)
        })
    });

    const switchWithLazyCase = () => Switch()
        .caseLazy("tommy", () =>true)
        .caseLazy(true, () =>"myes")

    whenValues({theSwitch: switchWithLazyCase}, ({theSwitch}) => {
        whenValues({inputValue: "nonMatchingInputValue"}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: "tommy"}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toBeTrue()
        })

        whenValues({inputValue: true}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toEqual("myes")
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

    const switchWithMatchesOnly = () => Switch()
        .matches((v:string) => v == "tommy", "yay tommy")
        .matches((v:number) => v % 2 == 0, "oooo even number")
        .matchesLazy((v:number) => v % 2 == 1, odd => `oooo odd number ${odd}`)
        .matchesType(isSpecificInterface, specific => specific.specificProperty)

    whenValues({theSwitch: switchWithMatchesOnly}, ({theSwitch}) => {
        whenValues({inputValue: "sidfusidufhsidu"}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: 6}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toEqual("oooo even number")
        })

        whenValues({inputValue: "tommy"}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toEqual("yay tommy")
        })

        whenValues({inputValue: 7}, ({inputValue}) => {
            itExpects(() => theSwitch().get(inputValue).value).toEqual("oooo odd number 7")
        })
    });
})