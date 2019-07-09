import { renderApp } from "../state/renderApp";

export const fieldUpdateReducer = 
    (state, fieldName) => 
    newValue => 
    renderApp({
        ...state,
        [fieldName]: newValue
    });
