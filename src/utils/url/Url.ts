import { IUrl } from "./IUrl";
import { Protocol } from "./Protocol";
import { copyMutateAndWrap } from "./copyMutateAndWrap";
import { defaultPort } from "./defaultPort";

export const Url = (nativeURL:URL):IUrl => ({
    get path() { return nativeURL.pathname },
    get fullyQualifiedDomainName() { return nativeURL.host },
    get protocol() { return nativeURL.protocol.replace(":","") as Protocol },
    get asString() { return nativeURL.toString() },
    get toHttps() { return this.setProtocol("https") },
    get port() { return Number(nativeURL.port) },
    setPath: (newPath) => copyMutateAndWrap(nativeURL, u => u.pathname = newPath),
    setProtocol: (newProtocol) => copyMutateAndWrap(nativeURL, u => u.protocol = newProtocol),
    setHost: (newHost) => copyMutateAndWrap(nativeURL, u => u.host = newHost),
    toString() { return this.asString },
    setPort(newPort) {
        return copyMutateAndWrap(
            nativeURL, 
            u => u.port = newPort == defaultPort(this.protocol) 
                ? "" 
                : newPort.toString()
        )
    }
})