import * as React from "react"
import { WithNavTo } from "../../nav/WithNavTo";
import { Grid, Typography } from "@material-ui/core";
import { Image } from "../../forms/viewEditToggleables/Image";
import { Text } from "../../forms/viewEditToggleables/Text";
import { PageTitle } from "../../page/PageTitle";
import { defaultOrgLogoSrc } from "../data/defaultOrgLogoSrc";
import { Space } from "../../page/Space";
import { WithOrganization } from "../data/WithOrganization";

const fakeField = value => ({
    value
})

export type ViewOrEditLoadedOrganizationProps = WithNavTo & WithOrganization
export const ViewOrEditLoadedOrganization = (props: ViewOrEditLoadedOrganizationProps) => {
    const { organization } = props
    const {creatorEmail, title, mission, imageThumbnailURL, homepage } = organization

    const [ isEditMode, isEditModeSet ] = React.useState(false)
    
    const orgTitleField = fakeField(title)
    const imageThumbnailField = fakeField(imageThumbnailURL || defaultOrgLogoSrc)

    return <div>
        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
            <Grid item>
                <Image field={imageThumbnailField} isEditMode={false} />
            </Grid>
            <Grid item>
                <PageTitle><Text isEditable={true} isEditMode={isEditMode} field={orgTitleField} onEditModeRequested={() => isEditModeSet(true)} /></PageTitle>
                {homepage && <Typography variant="caption"><strong>Homepage:</strong> <a href={homepage}>{homepage}</a></Typography>}
            </Grid>
        </Grid>
        <Space />
        {mission && <Typography variant="body1"><strong>Mission:</strong> {mission}</Typography>}
        <Space />
        <Typography variant="caption" style={{color: "lightgray"}}>Created by: {creatorEmail}</Typography>
    </div>
}