import * as React from "react"
import { findOrgByHref } from "../data/findOrgByHref";
import { MissingOrganization } from "./MissingOrganization";
import { Page } from "../../page/Page";
import { ViewOrEditLoadedOrganization } from "./ViewOrEditLoadedOrganization";
import { orgHrefFromEditUrl } from "../data/orgHrefFromEditUrl";

/*

Edit and View
-------------

I would like a single layout for viewing, and then the UI for each field offers a toggle
for editing, if the field is editable. There would not be an overall "edit" mode for all fields.
For this part, I will not be worrying about creating org.

*/

export const ViewOrEditOrganization = ({organizations, url, navTo}) => {
    const href = orgHrefFromEditUrl(url.path)
    
    const content = findOrgByHref(organizations, href)
    .map(organization => <ViewOrEditLoadedOrganization {...{organization, navTo}} />)
    .valueOrDefault(<MissingOrganization />)
    
    return <Page>
        {content}
    </Page>
}