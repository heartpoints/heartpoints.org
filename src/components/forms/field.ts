import { Mapper } from "../../utils/axioms/Mapper";
import { Reducer } from "../../utils/axioms/Reducer";
import { Consumer } from "../../utils/axioms/Consumer";
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