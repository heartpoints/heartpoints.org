import * as React from 'react';

import ImageUploader from 'react-images-upload';

export const fieldSetChildStyle = {
    "display": "block",
    "padding": "10px",
    "margin": "10px auto 0",
    "border-radius": "5px",
    "border": "1px solid #a0a0a0"
}

export const inputStyle = {
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

    const updateNewOrgTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newOrgTitle = event.target.value;
        props.updateNewOrgTitle(newOrgTitle);
    }

    const updateNewOrgMission = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const newOrgMission = event.target.value;
        props.updateNewOrgMission(newOrgMission);
    }

    const updateNewOrgUrl = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newOrgUrl = event.target.value;
        props.updateNewOrgUrl(newOrgUrl);
    }

    const combineStyles = (...styles) => {
        return Object.assign({}, ...styles);
    }

    const updateNewOrgLogo = (image) => {
        props.updateNewOrgLogo(image);
    }

    return(
        <React.Fragment>
           <ImageUploader
                singleImage={true}
                withPreview={true}
                fileContainerStyle={combineStyles(fieldSetChildStyle, inputStyle)}
                withLabel={false}
                buttonText="Upload Organization Logo"
                onChange={updateNewOrgLogo}
                imgExtension={['.jpg', '.gif', '.png']}
            />
            <input style={combineStyles(fieldSetChildStyle, inputStyle)} id="orgName" type="text" placeholder="Organization Name" onChange={updateNewOrgTitle} value={props.newOrgTitle}/>
            <input style={combineStyles(fieldSetChildStyle, inputStyle)} id="orgUrl" type="text" placeholder="Organization Webpage" onChange={updateNewOrgUrl} value={props.newOrgUrl}/>
            <textarea style={combineStyles(fieldSetChildStyle, inputStyle)} id="orgMission" rows={5} cols={50} placeholder="Mission Statement" onChange={updateNewOrgMission} value={props.newOrgMission}></textarea>
            <button style={combineStyles(fieldSetChildStyle, inputStyle, submitButtonStyle)} onClick={props.addNewOrganization}>Submit</button>
        </React.Fragment>
    );
}