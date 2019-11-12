import { urlFromString } from "../../utils/url/urlFromString";

export const initialNavState = () => ({
    isSideNavExpanded: false,
    isSideNavOpen: false,
    url: urlFromString(window.location.href),
})