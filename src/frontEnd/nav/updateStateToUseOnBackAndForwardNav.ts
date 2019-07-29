import { history } from "./history";
import { navTo } from "./navTo";
import { renderApp } from "../state/renderApp";
import { UnregisterCallback } from "history";
import { doNothing } from "../../utils/axioms/doNothing";

//TODO: Undo the global state here
export let previousHistoryListener:UnregisterCallback = doNothing;
export const updateStateToUseOnBackAndForwardNav = <S>(state:S) => {
    previousHistoryListener();
    previousHistoryListener = history().listen((location, action) => {
        action == "POP" && renderApp(navTo(state, location.pathname, true));
    });
};
