import { actionForState } from "./actionForState";
import { mapProperties } from "./utils/list";
import { actionables } from "./actionables";

// const createCastleRiskController = state => {
//     const statefulController = StatefulController(renderApp, state);
//     const statefulControllerByProperty = StatefulControllerByProperty(statefulController);
//     return statefulControllerByProperty('castleRisk', CastleRiskInitialState);
// }
// const castleRiskController = createCastleRiskController(state)
// CastleRisk: castleRiskController(CastleRisk),

export const newSiteProps = state => ({
    ...state,
    ...mapProperties(actionables, actionForState(state)),
});
