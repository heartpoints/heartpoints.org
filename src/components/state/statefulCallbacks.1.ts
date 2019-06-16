import { makeStatefulCallback } from "./makeStatefulCallback";
import { mapProperties } from "../../utils/list";
import { stateUpdatingCallbacks } from "./stateUpdatingCallbacks";
export const statefulCallbacks = (state) => mapProperties(stateUpdatingCallbacks, stateUpdatingCallback => makeStatefulCallback(state, stateUpdatingCallback));
