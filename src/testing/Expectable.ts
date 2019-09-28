import { ReturnValue } from "./ReturnValue";
export type Expectable<P, R> = {
    expect: {
        returnValue: ReturnValue<P, R>;
    };
};
