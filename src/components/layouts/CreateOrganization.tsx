import * as React from 'react';

export const CreateOrganization = (props) => {

    const updateNewOrgTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
        const newOrgTitle = event.target.value;
        props.updateNewOrgTitle(newOrgTitle);
    }

    const updateNewOrgMission = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const newOrgMission = event.target.value;
        props.updateNewOrgMission(newOrgMission);
    }

    return(
        <React.Fragment>
            <fieldset>
                <legend>Create your Organization</legend>
                <input required id="orgName" type="text" placeholder="Organization Name" onChange={updateNewOrgTitle} />
                <textarea required id="orgMission" rows={5} cols={50} placeholder="Mission Statement" onChange={updateNewOrgMission}></textarea>
                <button onClick={props.addNewOrganization}>Submit</button>
            </fieldset>
        </React.Fragment>
    );
}