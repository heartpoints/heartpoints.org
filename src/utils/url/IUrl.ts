import { Protocol } from "./Protocol";

export interface IUrl {
    path: string
    protocol: Protocol
    asString: string
    setPath(newPath: string): IUrl
    toString(): string
    setProtocol(newProtocol:Protocol): IUrl
}
