import { IncomingHttpHeaders } from "http";
import { maybe } from "../../utils/maybe/maybe";
import { IMaybe } from "../../utils/maybe/IMaybe";

//todo: suppport the string[] api or remove it from type
export type Headers = {
    [P in keyof Required<IncomingHttpHeaders>]: IMaybe<string>
} & {
    [key:string]:IMaybe<string>
}

export const headers = (incomingHttpHeaders: IncomingHttpHeaders) => ({
    get(_, name) {
        return maybe(incomingHttpHeaders[name]).map(h => h.toString());
    }
});
