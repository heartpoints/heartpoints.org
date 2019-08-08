import { renderApp } from "../react/renderApp"

export const fieldUpdateReducer = 
    (state, fieldName) => 
    newValue => 
    renderApp({
        ...state,
        [fieldName]: newValue
    })
