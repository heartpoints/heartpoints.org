import { Url } from "../../utils/url";

export const initialNavState = () => ({
    isSideNavExpanded: false,
    isSideNavOpen: false,
    url: Url(window.location.href),
})