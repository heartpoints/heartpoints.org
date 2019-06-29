import { IUrl } from "../../utils/url/IUrl";

export const orgHrefFromEditUrl = 
    (editUrl:IUrl) => 
    editUrl.path.substring(0, editUrl.path.indexOf("/edit"))
