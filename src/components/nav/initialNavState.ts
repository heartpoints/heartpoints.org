import { Url } from "../../utils/url/Url";

export const initialNavState = () => ({
    isSideNavExpanded: false,
    isSideNavOpen: false,
    url: Url(window.location.href),
})