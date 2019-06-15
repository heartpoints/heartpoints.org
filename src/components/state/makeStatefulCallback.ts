import { renderApp } from "./renderApp";

export const makeStatefulCallback = (state, stateUpdatingCallback) => (...args) => {
    const newState = stateUpdatingCallback(state, ...args);
    renderApp(newState);
};