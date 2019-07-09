import * as React from "react"
import { orgHrefFromEditUrl } from "../data/orgHrefFromEditUrl";
import { findOrgByHref } from "../data/findOrgByHref";
import { EditLoadedOrganization } from "./EditLoadedOrganization";
import { MissingOrganization } from "./MissingOrganization";
import { Page } from "../../page/Page";
import { WithBindFields, WithBindField } from "../../state/renderApp";
import { IUrl } from "../../../utils/url/IUrl";
import { Organization } from "../data/organization";
import { title } from "../reducers/newOrganizationFields";

export type ViewOrEditOrgProps<S, T> = 
    WithBindField<S, T> & 
    WithBindFields<S, T> & 
    WithUrl & 
    WithOrganizations

export type WithUrl = {
    url: IUrl
}

export type WithPossibleNewOrganization = {
    possibleNewOrganization: Organization
}

export type Organizations = Array<Organization>

export type WithOrganizations = {
    organizations: Organizations
}

export const ViewOrEditOrNewOrg = (props:ViewOrEditOrgProps<WithPossibleNewOrganization, string>) => {
    const { bindField, url, organizations } = props
    const orgHref = orgHrefFromEditUrl(url)

    const orgFields = (org:Organization) => ({
        title: bindField(title)
    })

    // const orgFields = (org:Organization) => bindFields(editOrganizationFields(org.href))
    
    //TODO: Continue working on solving below case (one field), perhaps for New Org (simpler)
    // const nestedOrgTitleField = nestedOrgField(orgHref)(title)
    // const orgFields = (org:Organization) => ({
    //     title: bindField(nestedOrgTitleField)
    // })

    const content = findOrgByHref(organizations, orgHref)
        .map(org => <EditLoadedOrganization orgFields={orgFields(org)} />)
        .valueOrDefault(<MissingOrganization />)
    
    return <Page>
        {content}
    </Page>
}