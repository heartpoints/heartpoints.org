import { Phase } from './game';
import { Switch } from "../../utils/switch/Switch";
import { NotFound } from '../nav/NotFound';
import { Welcome } from "./Welcome";
import { AddPlayer } from "./AddPlayer";

export const componentForPhase = phase => Switch
    .when(phase)
    .case(Phase.Welcome, Welcome)
    .case(Phase.AddPlayer, AddPlayer)
    .result
    .valueOrDefault(NotFound);
