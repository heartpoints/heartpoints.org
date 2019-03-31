import * as React from 'react';
import { Phase } from './game';
import { Switch, Case } from '../../utils/Switch';

export const CastleRisk = (props) => {
    const { classes, phase, updateState, player } = props
    const phaseName = Switch(phase,
        Case(Phase.Welcome, "Welcome"),
        Case(Phase.Rules, "Rules"),
        Case(Phase.AddPlayer, "Add a Player"),
    );
    return  <div className={classes.content}>
        <h1>Castle Risk</h1>
        <hr></hr>
        <p>Phase {phaseName.value}</p>
        {phase == Phase.Welcome && <button onClick={() => updateState({phase: Phase.AddPlayer})}>Begin Game</button>}
        {phase == Phase.AddPlayer && <div>
            <input autoFocus type="text" value={player} onChange={e => updateState({player: e.target.value})} />
        </div>}
        </div>
}