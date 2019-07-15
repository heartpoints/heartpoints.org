import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import ClearIconRounded from '@material-ui/icons/ClearOutlined';
import { Typography } from '@material-ui/core';

export const modalForgroundStyle = {
    "margin": "10px auto 0",
    "padding": "15px",
    "width": "50%",
    "background-color": "#FFFFFF",
    "border-radius": "10px",
    "text-align": "center",
}

export const modalHeaderStyle = {
    "margin-top": "0px",
    "font-size": "4vw",
    "color": "rgba(255,0,0,0.5)",
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
            <div style={modalForgroundStyle}>
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