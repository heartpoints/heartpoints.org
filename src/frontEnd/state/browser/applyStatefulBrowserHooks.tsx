import { updateStateToUseOnBackAndForwardNav } from "./updateStateToUseOnBackAndForwardNav";
import { applyBrowserResizeHooks } from "./applyBrowserResizeHooks";

export const applyStatefulBrowserHooks = (state) => {
    applyBrowserResizeHooks(state)
    updateStateToUseOnBackAndForwardNav(state)
};
