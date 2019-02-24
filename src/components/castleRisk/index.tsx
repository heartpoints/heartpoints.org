import * as React from "react";
import { CastleRisk } from "./CastleRisk";
import { castleRiskInitialState, Phase } from "./game";

export const CastleRiskController = ({renderApp, state}) => {
    const castleRiskProps = {
       ...castleRiskInitialState,
       ...state,
       onBeginGameRequested() {
            renderApp({...state, phase: Phase.Rules})
       }
    }
    return <CastleRisk {...castleRiskProps} />
}