import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import ClearIconRounded from '@material-ui/icons/ClearOutlined';

export const modalForgroundStyle = {
    "margin": "50px auto 0",
    "padding": "25px",
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
                <h1 style={{clear: "both", marginTop: "0px", fontSize: "4vw", color: "rgba(255,0,0,0.5)"}}>
                    {props.title}
                </h1>
                <h3 style={{fontSize: "1.5vw"}}>
                    {props.subtitle}
                </h3>
                <img 
                    style={{width: "50%", margin: "12px 0"}} 
                    src={props.imageURL} />
                {props.children}
            </div>
        </Modal>
    )
}