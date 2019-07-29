import { fieldNamed } from "../../state/fields/fieldNamed";
import { defaultOrgLogoSrc } from "../data/defaultOrgLogoSrc";
import { Organization } from "../data/organization";

export const title = fieldNamed<Organization, "title">("title", "Organization Title")
export const homepage = fieldNamed<Organization, "homepage">("homepage", "Organization Home Page")
export const mission = fieldNamed<Organization, "mission">("mission", "Mission Statement / Summary")
export const imageThumbnailURL = fieldNamed<Organization, "imageThumbnailURL">("imageThumbnailURL", defaultOrgLogoSrc)

export const generalOrgFields = {
    title,
    homepage,
    mission,
    imageThumbnailURL,
}
