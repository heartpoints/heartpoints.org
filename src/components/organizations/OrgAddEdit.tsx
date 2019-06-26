import * as React from 'react';

import { InputForField } from '../forms/InputForField';
import { TextAreaForField } from '../forms/TextAreaForField';
import { ImagePicker } from '../forms/ImagePicker';

export const OrgAddEdit = (props) => {
    const { title, homepage, mission, imageThumbnailURL } = props
    return <React.Fragment>
        <ImagePicker imagePlaceholderSrc="/images/demo_icon.png" imageField={imageThumbnailURL} />
        <InputForField {...title} /><br />
        <InputForField {...homepage} /><br />
        <TextAreaForField {...mission} /><br />
    </React.Fragment>
}

