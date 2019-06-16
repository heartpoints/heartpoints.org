import { Consumer } from "../../utils/consumer";

export const field = (selector, reducer, placeholder):Field<any> => ({
    get value() { return selector(); },
    setValue(newValue) { reducer(newValue); },
    placeholder,
});

export type FieldBinder<S, T> = (state: S, renderApp: Consumer<S>) => Field<T>

export type Field<T> = {
    value:T,
    setValue(t:T):void,
    placeholder:string
}