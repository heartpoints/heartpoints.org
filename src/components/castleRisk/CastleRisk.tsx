import * as React from 'react';
import { Phase } from './game';
import { Switch } from '../../utils/Switch';

export const CastleRisk = (props) => {
    const { classes, phase, updateState, player } = props
    const phaseName = Switch()
        .case(Phase.Welcome, "Welcome")
        .case(Phase.Rules, "Rules")
        .case(Phase.AddPlayer, "Add a Player")
        .get(phase)
        .value;

    return  <div className={classes.content}>
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
    </div>
}