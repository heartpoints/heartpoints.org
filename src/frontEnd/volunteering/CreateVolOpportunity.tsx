import React from 'react';
import { Page } from '../page/Page';
import {Grid, Typography} from '@material-ui/core';
import { PageTitle } from '../page/PageTitle';
import { SelectDropdown } from '../forms/SelectDropdown';
import { LoadFullVolOpportunityForm } from './LoadFullVolOpportunityForm';
import { List } from "../../utils/list/List";
import { WithOrganizations } from '../organizations/data/WithOrganizations';
import { WithNavTo } from '../nav/WithNavTo';
import { defaultOrgLogoSrc } from '../organizations/data/defaultOrgLogoSrc';
import { Image } from '../forms/viewEditToggleables/Image';
import { Space } from '../page/Space';
import { InputForField } from '../forms/InputForField';

type CreateVolOpportunityProps = WithNavTo & WithOrganizations
export const CreateVolOpportunity = ({organizations, navTo} : CreateVolOpportunityProps) => {
    const [selectedOrg, setselectedOrg] = React.useState('');
    const ListOfOrganizationTitles:Array<String> = organizations.map(org => org.title);
    const updateSelectedOrg = (orgTitle) => {
        setselectedOrg(orgTitle);
    }
    //const selectedOrgDetails = List(organizations).first(o => o.title == selectedOrg);
    const data = organizations.map(org => org.title === selectedOrg ? org : undefined);
    const selectedOrgDetails = data.filter(item => item !== undefined);
    console.log(selectedOrgDetails);

return <Page>
            <PageTitle> Create Volunteering Opportunity </PageTitle>      
            <Space />          
            <SelectDropdown optionsToBeDisplayed={ListOfOrganizationTitles} selectedData={updateSelectedOrg} />
            {
                selectedOrg !== '' ? <LoadFullVolOpportunityForm {...selectedOrgDetails[0]}{...navTo}/> : null
            }
        </Page>
}