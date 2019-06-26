import * as React from 'react';
import { OrgAddEdit } from './OrgAddEdit';
import { HPButton } from '../forms/HPButton';

export const EditLoadedOrganization = ({ orgFields }) => <React.Fragment>
    <h1>Edit Organization &quot;{orgFields.title.value}&quot;</h1>
    <OrgAddEdit {...orgFields} />
    <HPButton label="Done Editing" onClick={() => history.back()} />
</React.Fragment>
