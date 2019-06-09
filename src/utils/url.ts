export interface Url {
    path:string
    asString:string
    setPath(newPath:string):Url
}

export const Url = (urlString:string) => ({
    get path() { return new URL(urlString).pathname },
    asString: urlString,
    setPath(newPath) { 
        const tempUrl = new URL(urlString);
        tempUrl.pathname = newPath
        return Url(tempUrl.toString())
    },
    toString: () => urlString,
})