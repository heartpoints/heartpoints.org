export interface IUrl {
    path: string
    asString: string
    setPath(newPath: string): IUrl
    toString(): string
}
