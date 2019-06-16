import { Mapper } from "../../utils/mapper";
import { Reducer } from "../../utils/Reducer";
import { Consumer } from "../../utils/consumer";
import { Field, FieldBinder } from "./field";

export const lazyField = 
    <S, T>(selector: Mapper<S, T>, reducer: Reducer<S, T>, placeholder: string):FieldBinder<S, T> => 
    (state: S, renderApp: Consumer<S>): Field<T> => 
    ({
        get value() { return selector(state); },
        setValue(newValue) { renderApp(reducer(state, newValue)) },
        placeholder,
    });