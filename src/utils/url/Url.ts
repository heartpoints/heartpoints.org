import { IUrl } from "./IUrl";

export const Url = (urlString:string):IUrl => ({
    get path() { return new URL(urlString).pathname },
    asString: urlString,
    setPath(newPath) { 
        const tempUrl = new URL(urlString);
        tempUrl.pathname = newPath
        return Url(tempUrl.toString())
    },
    toString: () => urlString,
})