import * as React from 'react';
import { Typography, Input } from '@material-ui/core';
import { Space } from '../page/Space';
import { PhaseTitle } from './PhaseTitle';

export const AddPlayer = ({ player, updateState }) => <React.Fragment>
    <PhaseTitle>Add a Player</PhaseTitle>
    <Input type="text" value={player} onChange={e => updateState({ player: e.target.value })} />
    <Space />
    <Typography variant="h6">Players</Typography>
    <ul>
        <li><Typography variant="body1">{player}</Typography></li>
    </ul>
</React.Fragment>;
