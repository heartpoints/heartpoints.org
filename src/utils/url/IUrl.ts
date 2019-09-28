import { Protocol } from "./Protocol";

export interface IUrl {
    path: string
    host: string
    protocol: Protocol
    asString: string
    setPath(newPath: string): IUrl
    toString(): string
    toHttps: IUrl
    port:number
    setProtocol(newProtocol:Protocol): IUrl
    setHost(newHost:string): IUrl
    setPort(newPort:number): IUrl
}
