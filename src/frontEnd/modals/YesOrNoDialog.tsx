import * as React from 'react';
import { Dialog, DialogTitle} from '@material-ui/core';
import { HPButton } from '../forms/HPButton';
import { doNothing } from '../../utils/axioms/doNothing';


export const YesOrNoDialog = (props) => {
    const { isOpen, titleText, onYesClicked, onNoClicked} = props;
    return <Dialog onClose={doNothing} open={isOpen}>
        <DialogTitle>{titleText}</DialogTitle>
        <div style={{textAlign: "center"}}>
            <HPButton onClick={onYesClicked} label="Yes" />
            <HPButton onClick={onNoClicked} label="No" />
        </div>
    </Dialog>
}