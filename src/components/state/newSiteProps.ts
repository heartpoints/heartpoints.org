import { makeStatefulCallback } from "./makeStatefulCallback";
import { mapProperties } from "../../utils/list";
import { stateUpdatingCallbacks } from "./stateUpdatingCallbacks";

export const newSitePropsFromState = state => ({
    ...state,
    //todo: create fields here? or possibly, create them nearer to the Component that consumes them?
    ...mapProperties(stateUpdatingCallbacks, stateUpdatingCallback => makeStatefulCallback(state, stateUpdatingCallback)),
});