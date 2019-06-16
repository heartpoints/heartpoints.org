import { stateBuilders } from "./stateBuilders";

export const sitePropsFromState = 
    (state, renderApp) => 
    stateBuilders.reduce(
        (totalState, currentBuilder) => ({...totalState, ...currentBuilder(totalState, renderApp) }),
        state
    )