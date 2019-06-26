import * as React from 'react';

import { InputForField } from '../forms/InputForField';
import { TextAreaForField } from '../forms/TextAreaForField';
import { ImagePicker } from '../forms/ImagePicker';
import { Space } from '../page/Space';

export const OrgAddEdit = (props) => {
    const { title, homepage, mission, imageThumbnailURL } = props
    return <React.Fragment>
        <Space />
        <ImagePicker imagePlaceholderSrc="/images/demo_icon.png" imageField={imageThumbnailURL} caption="Organization Logo" /><br />
        <InputForField {...title} /><br />
        <InputForField {...homepage} /><br />
        <TextAreaForField {...mission} /><br />
    </React.Fragment>
}

