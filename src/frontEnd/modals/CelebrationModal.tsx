import * as React from 'react';

import { HPModal } from './HPModal';
import Confetti from 'react-confetti';
import FavoriteIconTwoTone from '@material-ui/icons/FavoriteBorderTwoTone';
import RedeemIconOutlined from '@material-ui/icons/RedeemOutlined';
import StoreIconOutlined from '@material-ui/icons/StoreOutlined';
import LockIconOutlined from '@material-ui/icons/LockOutlined';
import { HPButton } from '../forms/HPButton';
import { Typography } from '@material-ui/core';

export const confettiStyle:React.CSSProperties = {
    "position": "absolute",
    "top": "0",
    "left": "0"
}

export const actionIconContainerStyle = {
    "width": "100%",
    "display": "inline-block",
    "marginBottom": "1em"
}

export interface ICelebrationModalProps {
    onXClicked(): void,
    numHeartpointsAwarded: number
}

export const CelebrationModal = (props:ICelebrationModalProps) => { 
    const { innerWidth:width, innerHeight:height } = window;
    const numberOfPieces = width * height / 3638.4;
    const confettiProps = {
        width,
        height,
        numberOfPieces,
        gravity: 0.3,
        style: confettiStyle
    }

    return(
        <React.Fragment>
            <Confetti {...confettiProps} />
            <HPModal
                title="Congratulations!"
                subtitle={
                    <Typography variant="h3" style={{fontSize: "1.5em"}}>
                        You have been awarded &nbsp;  
                        <FavoriteIconTwoTone />
                        {props.numHeartpointsAwarded}
                    </Typography>
                }
                imageURL="/images/celebration.png" 
                onXClicked={props.onXClicked}>
                    <div>
                        <div style={actionIconContainerStyle}>
                            <HPButton
                                label="Give it "
                                onClick={alert}>
                                <RedeemIconOutlined />
                            </HPButton>
                            <HPButton
                                label="Use it "
                                onClick={alert}>
                                <StoreIconOutlined />
                            </HPButton>
                            <HPButton
                                label="Keep it "
                                onClick={alert}>
                                <LockIconOutlined />
                            </HPButton>
                        </div>
                    </div>
            </HPModal>
        </React.Fragment>
    )
}