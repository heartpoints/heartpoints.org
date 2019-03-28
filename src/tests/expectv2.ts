import { NotImplementedError } from "../utils/NotImplementedError";
import { Provider } from "../utils/provider";

export type TheExpressionBlockOptions<T> = {
    // isExpected: ExpectStatic,
    result: Provider<T>,
}

export type TheExpressionBlock<T> = (value:TheExpressionBlockOptions<T>) => any;

export const theExpression = <T>(expressionUnderTest: Provider<T>, block: TheExpressionBlock<T>) => {
    throw new NotImplementedError();
};

/*
example usage

theExpression(() => theSwitch.value(inputValue).hasValue, ({isExpected}) => {
    isExpected.to.be.false;
});

*/