import { notWWWWHost } from "./notWWWWHost";

export const forceWWWHost = (hostName: string) => notWWWWHost(hostName) ? `www.${hostName}` : hostName;