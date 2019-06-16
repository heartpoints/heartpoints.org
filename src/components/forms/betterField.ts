import { field } from "./field";
import { fieldUpdateReducer } from "./fieldUpdateReducer";

export const betterField = 
    (state, fieldName, placeholder) => 
    field(
        () => state[fieldName], 
        fieldUpdateReducer(state, fieldName),
        placeholder
    )
