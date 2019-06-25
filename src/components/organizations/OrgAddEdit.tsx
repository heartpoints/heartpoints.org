import * as React from 'react';
import { Page } from '../page/Page';

import ImageUploader from 'react-images-upload';
import { fileUploadHandler } from '../forms/fileUploadHandler';
import { fieldSetChildStyle } from '../forms/fieldSetChildStyle';
import { submitButtonStyle } from '../forms/submitButtonStyle';
import { InputForField } from '../forms/InputForField';
import { TextAreaForField } from '../forms/TextAreaForField';

export const OrgAddEdit = (props) => {
    const { title, homepage, mission, imageThumbnailURL, onSaveClicked } = props
    return <Page>
        {/* todo: edit needs to show image thats already there, lets replace this imageuploader with our own */}
        <ImageUploader
            singleImage={true}
            withPreview={true}
            fileContainerStyle={fieldSetChildStyle}
            withLabel={false}
            buttonText="Upload Organization Logo"
            onChange={fileUploadHandler(imageThumbnailURL.setValue)}
            imgExtension={['.jpg', '.gif', '.png']}
        />
        <InputForField {...title} />
        <InputForField {...homepage} />
        <TextAreaForField {...mission} />
        <button style={{...fieldSetChildStyle, ...submitButtonStyle}} onClick={onSaveClicked}>Submit</button>
    </Page>
}