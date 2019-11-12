import { urlFromString } from "../../utils/url/urlFromString";

export const initialNavState = () => ({
    //defaulted below 2 values for speedier testing
    isSideNavExpanded: false,
    isSideNavOpen: false,
    url: urlFromString(window.location.href),
})