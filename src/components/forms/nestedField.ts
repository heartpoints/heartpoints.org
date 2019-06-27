import { Field } from "./types/Field";
import { FieldBinder } from "./types/FieldBinder";
import { Mapper } from "../../utils/axioms/Mapper";
import { Consumer } from "../../utils/axioms/Consumer";
import { Reducer } from "../../utils/axioms/Reducer";

export const nestedField = 
    <S, T, V>(nestedStateSelector: Mapper<S, T>, nestedStateReducer: Reducer<S, T>) => 
    (field: FieldBinder<T, V>): FieldBinder<S, V> => 
    (state: S, renderApp: Consumer<S>): Field<V> => 
    field(
        nestedStateSelector(state), 
        nestedState => renderApp(nestedStateReducer(state, nestedState))
    )
