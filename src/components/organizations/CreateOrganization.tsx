import * as React from 'react';
import { Page } from '../page/Page';

import ImageUploader from 'react-images-upload';
import { fileUploadHandler } from '../forms/fileUploadHandler';
import { textChangeHandler } from '../forms/textChangeHandler';

export const fieldSetChildStyle = {
    "display": "block",
    "padding": "10px",
    "margin": "10px auto 0",
    "border-radius": "5px",
    "border": "1px solid #a0a0a0",
    "width": "400px",
    "text-align": "center"
}

export const submitButtonStyle = { 
    "color": "white",
    "background-color": "rgba(255, 0, 0, 0.5)",
    "font-weight": "bold",
    "font-size": "20px",
    "cursor": "pointer"
}

export const CreateOrganization = (props) => {
    const updateNewOrgLogo = fileUploadHandler(props.updateNewOrgLogo)
    const updateNewOrgTitle = textChangeHandler(props.updateNewOrgTitle)
    const updateNewOrgUrl = textChangeHandler(props.updateNewOrgUrl)
    const updateNewOrgMission = textChangeHandler(props.updateNewOrgMission)
    const addNewOrganization = () => props.addNewOrganization(props.facebookUserSession.email)

    //todo: ideally the state for this component is associated with the instance of it
    //todo: force single image not working?
    return <Page>
        <ImageUploader
            singleImage={true}
            withPreview={true}
            fileContainerStyle={fieldSetChildStyle}
            withLabel={false}
            buttonText="Upload Organization Logo"
            onChange={updateNewOrgLogo}
            imgExtension={['.jpg', '.gif', '.png']}
        />
        {/* todo: use material ui inputs that look nice! */}
        <input style={fieldSetChildStyle} id="orgName" type="text" placeholder="Organization Name" onChange={updateNewOrgTitle} value={props.newOrgTitle}/>
        <input style={fieldSetChildStyle} id="orgUrl" type="text" placeholder="Organization Webpage" onChange={updateNewOrgUrl} value={props.newOrgUrl}/>
        <textarea style={fieldSetChildStyle} id="orgMission" rows={5} cols={50} placeholder="Mission Statement" onChange={updateNewOrgMission} value={props.newOrgMission}></textarea>
        <button style={{...fieldSetChildStyle, ...submitButtonStyle}} onClick={addNewOrganization}>Submit</button>
    </Page>
}