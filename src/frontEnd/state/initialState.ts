import { initialOrgsState } from "../organizations/data/initialOrgsState";
import { initialDevelopersState } from "../developers/initialDevelopersState";
import { initialFacebookState } from "../facebook/intialFacebookState";
import { initialNavState } from "../nav/initialNavState";
import { initialModalsState } from "../modals/initialModalsState";
import { initialSearchBarState } from "../search/initalSearchBarState";
import { initialCastleRiskState } from "../castleRisk/initialCastleRiskState";
import { combineStateProviders } from "./combineStateProviders";
import { initialVolState } from "../volunteering/initialVolState";

export const initialState = combineStateProviders([
    initialOrgsState,
    initialDevelopersState,
    initialFacebookState,
    initialNavState,
    initialModalsState,
    initialSearchBarState,
    initialCastleRiskState,
    initialVolState
])
