import * as React from 'react';
import Confetti from 'react-confetti';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import FavoriteIconTwoTone from '@material-ui/icons/FavoriteBorderTwoTone';
import RedeemIconOutlined from '@material-ui/icons/RedeemOutlined';
import StroreIconOutlined from '@material-ui/icons/StoreOutlined';
import LockIconOutlined from '@material-ui/icons/LockOutlined';
import ClearIconRounded from '@material-ui/icons/ClearOutlined';

export const confettiStyle = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%"
}

export const modalForgroundStyle = {
    "margin": "50px auto 0",
    "padding": "25px",
    "width": "50%",
    "background-color": "#FFFFFF",
    "border-radius": "10px",
    "text-align": "center",
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

export const Celebration = (props) => {
    const { innerWidth:width, innerHeight:height } = window;
    const numberOfPieces = width * height / 3638.4;
    const confettiProps = {
        width,
        height,
        numberOfPieces,
        gravity: 0.3,
        style: confettiStyle
    }
    return <React.Fragment>
        <Confetti {...confettiProps} />
        <Modal 
        open={true}
        disableAutoFocus={true}>
            <div style={modalForgroundStyle}>
                <ClearIconRounded onClick={props.onXClicked} style={{float: "right"}}/>
                <h1 style={{clear: "both", marginTop: "0px", fontSize: "4vw", color: "rgba(255,0,0,0.5"}}>
                    Congratulations!
                </h1>
                <h3 style={{fontSize: "1.5vw"}}>
                    You have been awarded &nbsp;  
                    <FavoriteIconTwoTone />
                    {props.numHeartpointsAwarded}
                </h3>
                <img 
                    style={{width: "50%", margin: "12px 0"}} 
                    src="images/celebration.png" />
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
            </div>
        </Modal>
    </React.Fragment>
}