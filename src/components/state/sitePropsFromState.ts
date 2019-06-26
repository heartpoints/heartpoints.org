import { statefulCallbacks } from "./statefulCallbacks";

export const sitePropsFromState = 
    (state, renderApp) => 
    ({
        ...state,
        ...statefulCallbacks(state, renderApp)
    })