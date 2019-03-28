import { when, whenValues, itExpects } from "./expect";
import * as _ from "lodash";
import { expect } from "chai";
import { EmptySwitch } from "../utils/SwitchOO";

describe("Switch", () => {

    when("I have an empty switch", () => {
        const result = EmptySwitch();
        it("does not compile", () => {
            expect(() => result.value(5 as never)).to.throw;
        });
    });

    when("I have an empty switch with default", () => {
        const result = EmptySwitch();
        it("equals the default value", () => {
            itExpects(() => result.valueWithDefault(6 as never, 42)).toEqual(42);
        });
    });

    const switchWithOnlyCases = EmptySwitch()
        .case("myes", 6)
        .case(7, "myrrr")
        .case(true, false);

    whenValues({theSwitch: switchWithOnlyCases}, ({theSwitch}) => {
        whenValues({inputValue: 9}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: 7}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).value).toEqual("myrrr")
        })

        whenValues({inputValue: 55}, ({inputValue}) => {
            itExpects(() => theSwitch.valueWithDefault(inputValue, 42)).toEqual(42)
        })

        whenValues({inputValue: "myes"}, ({inputValue}) => {
            itExpects(() => theSwitch.valueWithDefault(inputValue, 42)).toEqual(6)
        })
    });

    const switchWithLazyCase = EmptySwitch()
        .caseLazy("tommy", ()=>true)
        .caseLazy(true, ()=>"myes")

    whenValues({theSwitch: switchWithLazyCase}, ({theSwitch}) => {
        whenValues({inputValue: "nonMatchingInputValue"}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: "tommy"}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).value).toBeTrue()
        })

        whenValues({inputValue: true}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).value).toEqual("myes")
        })
    });

    const switchWithMatchesOnly = EmptySwitch()
        .matches(v => v == "tommy", "yay tommy")
        .matches((v:number) => v % 2 == 0, "oooo even number")

    whenValues({theSwitch: switchWithMatchesOnly}, ({theSwitch}) => {
        whenValues({inputValue: 7}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).hasValue).toBeFalse()
        })

        whenValues({inputValue: 6}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).value).toEqual("oooo even number")
        })

        whenValues({inputValue: "tommy"}, ({inputValue}) => {
            itExpects(() => theSwitch.value(inputValue).value).toEqual("yay tommy")
        })
    });
})