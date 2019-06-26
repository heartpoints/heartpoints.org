import * as React from 'react';
import { Fab } from '@material-ui/core';

export const HPButton = ({ onClick, label }) => {
    return <Fab onClick={onClick} variant="extended" style={{marginLeft: "10px", marginTop: "10px", backgroundColor: "red", color: "white"}}>
        {label}
    </Fab>
};
