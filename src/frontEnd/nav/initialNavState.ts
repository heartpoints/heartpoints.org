import { Url } from "../../utils/url/Url";

export const initialNavState = () => ({
    isSideNavExpanded: true,
    isSideNavOpen: true,
    url: Url(window.location.href),
})