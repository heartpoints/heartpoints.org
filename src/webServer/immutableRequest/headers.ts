import { IncomingHttpHeaders } from "http";
import { IMaybe } from "../../utils/maybe/IMaybe";
import { JSONValue } from "../../utils/json/JSONValue";
import { headersLazyLookup } from "./headersLazyLookup";
import { log } from "../../utils/debugging/log";

//todo: suppport the string[] api or remove it from type
export type Headers = {
    [P in keyof Required<IncomingHttpHeaders>]: IMaybe<string>
} & {
    [key:string]:IMaybe<string>,
} & { asJSON:JSONValue }

export const headers = 
    (incomingHttpHeaders: IncomingHttpHeaders): Headers => 
    new Proxy(
        {
            get asJSON() { return log(incomingHttpHeaders) }
        } as any,
        headersLazyLookup(incomingHttpHeaders)
    )

