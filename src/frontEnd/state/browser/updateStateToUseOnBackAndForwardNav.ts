import { history } from "../../nav/history";
import { navTo } from "../../nav/navTo";
import { renderApp } from "../react/renderApp";
import { UnregisterCallback } from "history";
import { doNothing } from "../../../utils/axioms/doNothing";

//TODO: Undo the global state here
export let previousHistoryListener:UnregisterCallback = doNothing;
export const updateStateToUseOnBackAndForwardNav = <S>(state:S) => {
    previousHistoryListener();
    previousHistoryListener = history().listen((location, action) => {
        action == "POP" && renderApp(navTo(state, location.pathname, true));
    });
};
