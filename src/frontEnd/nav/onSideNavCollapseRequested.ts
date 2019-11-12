import { navTo } from "./navTo"

export const onSideNavCollapseRequested = (state, destination) => {
    console.log(destination);
    const newState =  {
        ...state,
        isSideNavOpen: false
    }

    const action = destination
        ? navTo(newState, destination)
        : newState

    return action
}

