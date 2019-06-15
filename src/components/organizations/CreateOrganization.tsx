import * as React from 'react';
import { Page } from '../page/Page';

import ImageUploader from 'react-images-upload';
import { fileUploadHandler } from '../forms/fileUploadHandler';
import { textChangeHandler } from '../forms/textChangeHandler';
import { fieldSetChildStyle } from '../forms/fieldSetChildStyle';
import { submitButtonStyle } from '../forms/submitButtonStyle';

/*
1. when user first navigates to createOrganization, we should create a new unsaved organization in the organizations array
2. changing the values in this form change those values instantly
3. clicking the button saves those values

i want a way, from the outside, to bind this form to an "Organization Model" instance,
from that, the form can read as well as update the properties just using plain old getters and setters, but where
the setter implies a rerender will occur (not a mutation).

ideally, for each field, i can also understand, is it valid? has it changed from its earlier version? if not valid, what is wrong? how do i show that?
maybe for a field i need a way to "clear" it (return it back to its default, without knowing what that may be?)

for "create new", the "new" org is just one that gets added to the orgs list
    - if we navigate away, what happens (navTo, otherwise)
    - do we only give an href upon save? Or perhaps we create it with an href and immediately show the edit view?

1. for now let's just put a "possibleNewOrg" field in the state that has all the org fields in it
2. rewire this view to update those fields and then submit the new org therefrom
3. create the edit org view by maximally reusing whats here

*/

export const CreateOrganization = (props) => {
    const updateNewOrgLogo = fileUploadHandler(props.updateNewOrgLogo)
    const updateNewOrgTitle = textChangeHandler(props.updateNewOrgTitle)
    const updateNewOrgUrl = textChangeHandler(props.updateNewOrgUrl)
    const updateNewOrgMission = textChangeHandler(props.updateNewOrgMission)
    const addNewOrganization = () => props.addNewOrganization(props.facebookUserSession.email)

    return <Page>
        <ImageUploader
            singleImage={true}
            withPreview={true}
            fileContainerStyle={fieldSetChildStyle}
            withLabel={false}
            buttonText="Upload Organization Logo"
            onChange={updateNewOrgLogo}
            imgExtension={['.jpg', '.gif', '.png']}
        />
        <input style={fieldSetChildStyle} id="orgName" type="text" placeholder="Organization Name" onChange={updateNewOrgTitle} value={props.newOrgTitle}/>
        <input style={fieldSetChildStyle} id="orgUrl" type="text" placeholder="Organization Webpage" onChange={updateNewOrgUrl} value={props.newOrgUrl}/>
        <textarea style={fieldSetChildStyle} id="orgMission" rows={5} cols={50} placeholder="Mission Statement" onChange={updateNewOrgMission} value={props.newOrgMission}></textarea>
        <button style={{...fieldSetChildStyle, ...submitButtonStyle}} onClick={addNewOrganization}>Submit</button>
    </Page>
}