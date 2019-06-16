import * as React from 'react';
import { Page } from '../page/Page';

import ImageUploader from 'react-images-upload';
import { fileUploadHandler } from '../forms/fileUploadHandler';
import { fieldSetChildStyle } from '../forms/fieldSetChildStyle';
import { submitButtonStyle } from '../forms/submitButtonStyle';
import { InputForField } from '../forms/InputForField';
import { TextAreaForField } from '../forms/TextAreaForField';

export const CreateOrganization = (props) => {
    const { title, homepage, mission, updateNewOrgLogo } = props

    //todo: move this into the model logic
    const addNewOrganization = () => props.addNewOrganization(props.facebookUserSession.email)

    return <Page>
        {/* todo: edit needs to show image thats already there, lets replace this imageuploader with our own */}
        <ImageUploader
            singleImage={true}
            withPreview={true}
            fileContainerStyle={fieldSetChildStyle}
            withLabel={false}
            buttonText="Upload Organization Logo"
            onChange={fileUploadHandler(updateNewOrgLogo)}
            imgExtension={['.jpg', '.gif', '.png']}
        />
        <InputForField {...title} />
        <InputForField {...homepage} />
        <TextAreaForField {...mission} />
        <button style={{...fieldSetChildStyle, ...submitButtonStyle}} onClick={addNewOrganization}>Submit</button>
    </Page>
}