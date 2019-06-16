import { Mapper } from "../../utils/mapper";
import { Reducer } from "../../utils/Reducer";
import { Consumer } from "../../utils/consumer";
import { Field } from "./types/Field";
import { FieldBinder } from "./types/FieldBinder";

export const field = 
    <S, T>(selector: Mapper<S, T>, reducer: Reducer<S, T>, placeholder: string):FieldBinder<S, T> => 
    (state: S, renderApp: Consumer<S>): Field<T> => 
    ({
        get value() { return selector(state); },
        setValue(newValue) { renderApp(reducer(state, newValue)) },
        placeholder,
    });