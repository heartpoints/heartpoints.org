import { urlFromString } from "../../utils/url/urlFromString";

export const initialNavState = () => ({
    isSideNavExpanded: true,
    isSideNavOpen: true,
    url: urlFromString(window.location.href),
})