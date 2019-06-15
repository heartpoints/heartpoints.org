import { makeStatefulCallback } from "./makeStatefulCallback";
import { mapProperties } from "../../utils/list";
import { stateUpdatingCallbacks } from "./stateUpdatingCallbacks";

export const newSitePropsFromState = state => ({
    ...state,
    ...mapProperties(stateUpdatingCallbacks, stateUpdatingCallback => makeStatefulCallback(state, stateUpdatingCallback)),
});