import React, {useState} from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const MiscSnackBar = ({msg}) => {

    const [shouldShow, toggleShow] = useState(true);

    const handleClose = () => toggleShow(false);
    
    return <Snackbar open={shouldShow} autoHideDuration={3000} message={msg} onClose={handleClose} action={[
        <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
    ]} />
}