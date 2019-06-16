import * as React from 'react';
import { Page } from '../page/Page';

import ImageUploader from 'react-images-upload';
import { fileUploadHandler } from '../forms/fileUploadHandler';
import { textChangeHandler } from '../forms/textChangeHandler';
import { fieldSetChildStyle } from '../forms/fieldSetChildStyle';
import { submitButtonStyle } from '../forms/submitButtonStyle';
import { InputForField } from '../forms/InputForField';

export const CreateOrganization = (props) => {
    const { newOrgUrl, newOrgMission, title } = props
    // const { newOrgTitle, newOrgUrl, newOrgMission, } = props
    const updateNewOrgLogo = fileUploadHandler(props.updateNewOrgLogo)
    // const updateNewOrgTitle = textChangeHandler(props.updateNewOrgTitle)
    const updateNewOrgUrl = textChangeHandler(props.updateNewOrgUrl)
    const updateNewOrgMission = textChangeHandler(props.updateNewOrgMission)
    const addNewOrganization = () => props.addNewOrganization(props.facebookUserSession.email)

    return <Page>
        {/* todo: edit needs to show image thats already there, lets replace this imageuploader with our own */}
        <ImageUploader
            singleImage={true}
            withPreview={true}
            fileContainerStyle={fieldSetChildStyle}
            withLabel={false}
            buttonText="Upload Organization Logo"
            onChange={updateNewOrgLogo}
            imgExtension={['.jpg', '.gif', '.png']}
        />
        <InputForField {...title} />
        {/* <input style={fieldSetChildStyle} id="orgName" type="text" placeholder="Organization Name" onChange={updateNewOrgTitle} value={newOrgTitle}/> */}
        <input style={fieldSetChildStyle} id="orgUrl" type="text" placeholder="Organization Webpage" onChange={updateNewOrgUrl} value={newOrgUrl}/>
        <textarea style={fieldSetChildStyle} id="orgMission" rows={5} cols={50} placeholder="Mission Statement" onChange={updateNewOrgMission} value={newOrgMission}></textarea>
        <button style={{...fieldSetChildStyle, ...submitButtonStyle}} onClick={addNewOrganization}>Submit</button>
    </Page>
}