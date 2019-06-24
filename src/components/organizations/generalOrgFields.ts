import { fieldNamed } from "../forms/fieldNamed";

export const generalOrgFields = {
    title: fieldNamed("title", "Organization Title"),
    homepage: fieldNamed("homepage", "Organization Home Page"),
    mission: fieldNamed("mission", "Mission Statement / Summary"),
    imageThumbnailURL: fieldNamed("imageThumbnailURL", "Organization Logo"),
};
