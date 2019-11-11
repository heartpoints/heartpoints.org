import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import ClearIconRounded from '@material-ui/icons/ClearOutlined';
import { Typography } from '@material-ui/core';

export const modalStyle:React.CSSProperties = {
    "width": "50%",
    "backgroundColor": "white",
    "borderRadius": "0.5em",
    "textAlign": "center",
    "padding": "10px",
    "position": "absolute",
    "top": "50%",
    "left": "50%",
    "transform": "translate(-50%, -50%)"
}

export interface IHPModalProps{
    title: string,
    subtitle: React.ReactNode,
    imageURL: string,
    children: React.ReactNode,
    onXClicked(): void,
}

export const HPModal = (props:IHPModalProps) => {
    return(
        <Modal
            open={true}
            disableAutoFocus={true}>
            <div style={modalStyle}>
                <ClearIconRounded onClick={props.onXClicked} style={{float: "right"}}/>
                <Typography variant="h1" style={{clear: "both", margin: "0px", fontSize: "4vw", color: "red"}}>
                    {props.title}
                </Typography>
                {props.subtitle}
                <img 
                    style={{width: "35%", margin: "15px 0"}} 
                    src={props.imageURL} />
                {props.children}
            </div>
        </Modal>
    )
}