import * as React from 'react';
import { State } from './game';

export const CastleRisk = (props:State) => {
    return <div>
        <h1>Castle Risk</h1>
        <p>Phase {props.phase}</p>
        <button onClick={props.onBeginGameRequested}>Begin Game</button>
    </div>
}
