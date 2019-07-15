import { renderApp } from "../renderApp";

export const fieldUpdateReducer = 
    (state, fieldName) => 
    newValue => 
    renderApp({
        ...state,
        [fieldName]: newValue
    });
