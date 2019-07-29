import * as React from 'react';
import { Typography } from '@material-ui/core';

export const PhaseTitle =
    ({ children: phaseName }) => 
    <Typography variant="h6">Phase: {phaseName}</Typography>
