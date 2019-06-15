import { initialOrgsState } from "../organizations/initialOrgsState";
import { initialDevelopersState } from "../developers/initialDevelopersState";
import { initialFacebookState } from "../facebook/intialFacebookState";
import { initialNavState } from "../nav/initialNavState";
import { initialModalsState } from "../modals/initialModalsState";
import { initialSearchBarState } from "../search/initalSearchBarState";
import { initialCastleRiskState } from "../castleRisk/initialCastleRiskState";
import { combineStateProviders } from "./combineStateProviders";

export const initialState = combineStateProviders([
    initialOrgsState,
    initialDevelopersState,
    initialFacebookState,
    initialNavState,
    initialModalsState,
    initialSearchBarState,
    initialCastleRiskState
])