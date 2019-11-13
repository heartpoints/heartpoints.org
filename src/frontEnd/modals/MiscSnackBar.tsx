import React, {useState} from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const MiscSnackBar = ({snackbarText, onDisplayHomeSnackbar }) => {

    const [shouldShow, toggleShow] = useState(true);

    const handleClose = () => {
        toggleShow(false);
        onDisplayHomeSnackbar(false);
    }

    return <Snackbar open={shouldShow} autoHideDuration={3000} message={snackbarText} onClose={handleClose} action={[
        <IconButton onClick={handleClose}>
            <CloseIcon />
        </IconButton>
    ]} />
}