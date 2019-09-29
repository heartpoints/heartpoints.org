import { forceWWWHost } from "./forceWWWHost";
import { HostName } from "../immutableRequest/HostName";
import { IUrl } from "../../utils/url/IUrl";
import { httpsDefaultPort } from "./httpsDefaultPort";

export const safeWWWUrl =
    (originalHost: HostName, url: IUrl) => 
    url.toHttps.setHost(forceWWWHost(originalHost)).setPort(httpsDefaultPort).asString;

