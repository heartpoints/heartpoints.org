import { renderApp } from "./renderApp";
export const actionForState = state => stateHandler => (...args) => {
    const newState = stateHandler(state, ...args);
    renderApp(newState);
};
