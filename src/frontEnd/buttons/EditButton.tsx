import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Tooltip } from '@material-ui/core';

export const EditButton = ({ navTo, href }) => <Tooltip title="Edit Organization" placement="right">
    <IconButton>
        <EditIcon onClick={() => navTo(`${href}/edit`)} />
    </IconButton>
</Tooltip>

