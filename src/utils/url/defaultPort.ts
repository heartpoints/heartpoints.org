import { Protocol } from "./Protocol";
export const defaultPort = (protocol: Protocol) => protocol == "http" ? 80 : 443;
