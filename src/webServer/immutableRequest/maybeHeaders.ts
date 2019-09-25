import { IncomingHttpHeaders } from "http";
import { Headers, headers } from "./headers";

export const maybeHeaders = 
    (incomingHttpHeaders: IncomingHttpHeaders): Headers => 
    new Proxy({} as any, headers(incomingHttpHeaders));
