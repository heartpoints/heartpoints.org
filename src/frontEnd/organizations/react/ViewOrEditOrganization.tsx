import * as React from "react"
import { findOrgByHref } from "../data/findOrgByHref";
import { MissingOrganization } from "./MissingOrganization";
import { Page } from "../../page/Page";
import { ViewOrEditLoadedOrganization } from "./ViewOrEditLoadedOrganization";
import { orgHrefFromEditUrl } from "../data/orgHrefFromEditUrl";

export const ViewOrEditOrganization = ({organizations, url, navTo}) => {
    const href = orgHrefFromEditUrl(url.path)
    
    const content = findOrgByHref(organizations, href)
        .map(organization => <ViewOrEditLoadedOrganization {...{organization, navTo}} />)
        .valueOrDefault(<MissingOrganization />)
    
    return <Page>
        {content}
    </Page>
}