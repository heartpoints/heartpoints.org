import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { HPButton } from '../../forms/HPButton';
import { PageTitle } from '../../page/PageTitle';
import { Space } from '../../page/Space';

export const EditLoadedOrganization = ({ orgFields }) => <React.Fragment>
    <PageTitle>{orgFields.title.value} <small style={{color: "lightgray"}}>(editing)</small></PageTitle>
    <OrgAddEdit {...orgFields}>
        <HPButton label="Done Editing" shouldUseThemeSpacing={false} onClick={() => history.back()} />
    </OrgAddEdit>
    
    <Space />
</React.Fragment>
