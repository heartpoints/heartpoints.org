import { makeStatefulCallback } from "./makeStatefulCallback";
import { mapProperties } from "../../utils/list";
import { stateUpdatingCallbacks } from "./stateUpdatingCallbacks";
const statefulCallbacks = (state) => mapProperties(stateUpdatingCallbacks, stateUpdatingCallback => makeStatefulCallback(state, stateUpdatingCallback));
