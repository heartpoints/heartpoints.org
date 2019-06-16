import { stateBuilders } from "./stateBuilders";

export const newSitePropsFromState = 
    state => 
    stateBuilders.reduce(
        (totalState, currentBuilder) => ({...totalState, ...currentBuilder(totalState) }),
        state
    )