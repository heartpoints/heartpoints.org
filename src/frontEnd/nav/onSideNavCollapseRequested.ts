import { navTo } from "./navTo"
import { isMobile } from "../site/isMobile";

export const onSideNavCollapseRequested = (state, destination) => {
    const newState =  {
        ...state,
        isSideNavOpen: isMobile() || !destination ? false : true
    }

    const action = destination
        ? navTo(newState, destination)
        : newState

    return action
}

