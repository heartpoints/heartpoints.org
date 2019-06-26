import * as React from 'react';
import { Phase } from './game';
import { Switch } from '../../utils/Switch';
import { Page } from '../page/Page';

export const CastleRisk = (props) => {
    const { phase, updateState, player } = props
    const phaseName = Switch
        .when(phase)
        .case(Phase.Welcome, "Welcome")
        .case(Phase.Rules, "Rules")
        .case(Phase.AddPlayer, "Add a Player")
        .result
        .value;

    return <Page>
        <h1>Castle Risk</h1>
        <hr></hr>
        <p>Phase {phaseName}</p>
        {phase == Phase.Welcome && <button onClick={() => updateState({phase: Phase.AddPlayer})}>Begin Game</button>}
        {phase == Phase.AddPlayer && <div>
            <input autoFocus type="text" value={player} onChange={e => updateState({player: e.target.value})} />
            <h3>Players</h3>
            <ul>
                <li>{player}</li>
            </ul>
        </div>}
    </Page>
}