import { actionForState } from "./actionForState";
import { mapProperties } from "./utils/list";
import { actionables } from "./actionables";

export const newSiteProps = state => ({
    ...state,
    ...mapProperties(actionables, actionForState(state)),
});
