import { Field } from "./types/Field";
import { FieldBinder } from "./types/FieldBinder";
import { Mapper } from "../../utils/mapper";
import { Consumer } from "../../utils/consumer";
import { Reducer } from "../../utils/Reducer";

export const nestedField = 
    <S, T, V>(nestedStateSelector: Mapper<S, T>, nestedStateReducer: Reducer<S, T>) => 
    (field: FieldBinder<T, V>): FieldBinder<S, V> => 
    (state: S, renderApp: Consumer<S>): Field<V> => 
    field(
        nestedStateSelector(state), 
        nestedState => renderApp(nestedStateReducer(state, nestedState))
    )
