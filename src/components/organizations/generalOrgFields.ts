import { fieldNamed } from "../forms/fieldNamed";
import { defaultOrgLogoSrc } from "./defaultOrgLogoSrc";
import { Organization } from "./organization";

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
