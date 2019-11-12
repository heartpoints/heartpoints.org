import * as React from 'react';

import { InputForField } from '../../forms/InputForField';
import { TextAreaForField } from '../../forms/TextAreaForField';
import { ImagePicker } from '../../forms/ImagePicker';
import { Space } from '../../page/Space';
import { Theme, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const classes = makeStyles((theme:Theme) => ({
    container: {
      marginLeft: theme.spacing(1),
      paddingLeft: 0
    },
}))

export const OrgAddEdit = (props) => {
    const { title, homepage, mission, imageThumbnailURL, children } = props
    return <Container className={classes().container}>
        <Space />
        <ImagePicker field={imageThumbnailURL} /><br />
        <InputForField {...title} /><br />
        <InputForField {...homepage} /><br />
        <TextAreaForField {...mission} /><br />
        {children}
    </Container>
}

