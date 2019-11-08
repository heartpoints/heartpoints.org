import * as React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Tooltip } from '@material-ui/core'

export const DeleteButton = ({onClick}) => <Tooltip title="Delete Organization" placement="right">
    <IconButton onClick={onClick}>
        <DeleteIcon />
    </IconButton>
</Tooltip>
    
