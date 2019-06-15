import { history } from "./history";

export const navTo = (state, path: string) => {
    const url = state.url.setPath(path);
    history().push(path);
    return { ...state, url };
};
