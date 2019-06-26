import * as React from 'react';

import { InputForField } from '../forms/InputForField';
import { TextAreaForField } from '../forms/TextAreaForField';
import { FilePicker } from '../forms/FilePicker';

export const OrgAddEdit = (props) => {
    const { title, homepage, mission, imageThumbnailURL } = props
    return <React.Fragment>
        <img style={{width: "50px", maxWidth: "50px"}} src={imageThumbnailURL.value || "/images/demo_icon.png"} />
        <FilePicker label="Upload Company Logo" onChange={imageThumbnailURL.setValue} /><br />
        <InputForField {...title} /><br />
        <InputForField {...homepage} /><br />
        <TextAreaForField {...mission} /><br />
    </React.Fragment>
}