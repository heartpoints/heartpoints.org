import * as React from 'react';
import { Phase } from './game';
import { Button } from '@material-ui/core';
import { PhaseTitle } from './PhaseTitle';

export const Welcome = ({ updateState }) => <React.Fragment>
    <PhaseTitle>Add a Player</PhaseTitle>
    <Button color="primary" onClick={() => updateState({ phase: Phase.AddPlayer })}>Begin Game</Button>
</React.Fragment>;
