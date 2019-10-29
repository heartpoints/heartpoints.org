import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Tooltip } from '@material-ui/core';

export const EditButton = ({ navTo, onClick }) => <Tooltip title="Edit Organization" placement="right">
    <IconButton onClick={onClick}>
        <EditIcon />
    </IconButton>
</Tooltip>

