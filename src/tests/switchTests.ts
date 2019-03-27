import { Maybe } from "../utils/maybe";
import { when, and, whenValues, itExpects } from "./expect";
import * as _ from "lodash";
import { first } from "../utils/list";
import { expect } from "chai";

interface ISwitch<T, V> {
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<T | S, R | V>
    value<Q extends T>(input:Q):Maybe<V>;
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V | D;
}

const Switch = ():ISwitch<never,never> => ({
    case<S, R>(possiblyEqualValue:S, resultToUseIfMatch:R):ISwitch<S, R> {
        return SwitchWith1Case([possiblyEqualValue], [resultToUseIfMatch])
    },
    value(input:any):never { throw new Error() },
    valueWithDefault<D>(input:any, defaultValue:D):D { return defaultValue }
});

const SwitchWith1Case = <T, V>(possiblyEqualValue1:T[], result1:V[]):ISwitch<T, V> => ({
    case<S, R>(possiblyEqualValue2:S, resultToUseIfMatch2:R):ISwitch<T | S, R | V> {
        return SwitchWith1Case([...possiblyEqualValue1, possiblyEqualValue2], [...result1, resultToUseIfMatch2])
    },
    value<Q extends T>(input:Q):Maybe<V> {
        const zipped = _.zip(possiblyEqualValue1, result1) as [T, V][];
        const firstMatch = first(zipped, ([a,]) => a == input);
        return firstMatch.map(([,b]) => b);
    },
    valueWithDefault<Q extends T, D>(input:Q, defaultValue:D):V|D {
        return this.value(input).valueOrDefault(defaultValue)
    }
})

describe("Switch", () => {
    when("I have an empty switch", () => {
        const result = Switch();
        it("does not compile", () => {
            expect(() => result.value(5 as never)).to.throw;
        });
    });
    when("I have an empty switch with default", () => {
        const result = Switch();
        it("equals the default value", () => {
            itExpects(() => result.valueWithDefault(6 as never, 42)).toEqual(42);
        });
    });
    when("I have a switch with complex cases", () => {
        const theSwitch = Switch()
            .case("myes", 6)
            .case(7, "myrrr")
            .case(true, false);
        
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
})