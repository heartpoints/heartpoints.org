import * as React from 'react';

import { HPModal } from './HPModal';
import Button from '@material-ui/core/Button';
import Confetti from 'react-confetti';
import FavoriteIconTwoTone from '@material-ui/icons/FavoriteBorderTwoTone';
import RedeemIconOutlined from '@material-ui/icons/RedeemOutlined';
import StroreIconOutlined from '@material-ui/icons/StoreOutlined';
import LockIconOutlined from '@material-ui/icons/LockOutlined';

export const confettiStyle = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%"
}

export const actionContainerStyle = {
    "background-color": "#E9E9E9",
    "border-radius": "25px",
    "padding": "10px",
    "margin": "0 auto",
}

export const actionIconContainerStyle = {
    "width": "100%",
    "display": "inline-block",
}

export const actionButtonStyle = {
    "margin": "8px",
    "background-color": "rgba(255,0,0,0.5)",
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
    const subtitleText:string = "You have been awarded " + props.numHeartpointsAwarded;

    return(
        <React.Fragment>
            <Confetti {...confettiProps} />
            <HPModal
                title="Congratulations!"
                subtitle={subtitleText}
                imageURL="images/Celebration.png" 
                onXClicked={props.onXClicked}>
                    <div style={actionContainerStyle}>
                        <h4>What you can do: </h4>
                        <div style={actionIconContainerStyle}>
                            <Button
                                style={actionButtonStyle}
                                size={'large'}
                                variant={'contained'}>
                                <RedeemIconOutlined />
                                <h5>&nbsp; Give It</h5>
                            </Button>
                            <Button
                                style={actionButtonStyle}
                                size={'large'}
                                variant={'contained'}>
                                <StroreIconOutlined />
                                <h5>&nbsp; Use It</h5>
                            </Button>
                            <Button
                                style={actionButtonStyle}
                                size={'large'}
                                variant={'contained'}>
                                <LockIconOutlined />
                                <h5>&nbsp; Keep It</h5>
                            </Button>
                        </div>
                    </div>
            </HPModal>
        </React.Fragment>
    )
}