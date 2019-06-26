import * as React from 'react';
import { Phase } from './game';
import { Switch } from '../../utils/Switch';
import { Page } from '../page/Page';
import { PageTitle } from '../page/PageTitle';
import { Typography, Input, Button } from '@material-ui/core';
import { Space } from '../page/Space';

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
        <PageTitle>Castle Risk</PageTitle>
        <Space />
        <Typography variant="h6">Phase: {phaseName}</Typography>
        {phase == Phase.Welcome && <Button color="primary" onClick={() => updateState({phase: Phase.AddPlayer})}>Begin Game</Button>}
        {phase == Phase.AddPlayer && <div>
            <Input type="text" value={player} onChange={e => updateState({player: e.target.value})} />
            <Space />
            <Typography variant="h6">Players</Typography>
            <ul>
                <li><Typography variant="body1">{player}</Typography></li>
            </ul>
        </div>}
    </Page>
}