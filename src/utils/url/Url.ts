import { IUrl } from "./IUrl";
import { Protocol } from "./Protocol";

export const Url = (urlString:string):IUrl => ({
    get path() { return new URL(urlString).pathname },
    get protocol() { return new URL(urlString).protocol.replace(":","") as Protocol },
    asString: urlString,
    setPath(newPath) { 
        const tempUrl = new URL(urlString);
        tempUrl.pathname = newPath
        return Url(tempUrl.toString())
    },
    setProtocol(newProtocol) {
        const tempUrl = new URL(urlString);
        tempUrl.protocol = newProtocol
        return Url(tempUrl.toString())
    },
    toString: () => urlString,
})