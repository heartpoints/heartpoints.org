import { IncomingHttpHeaders } from "http";
import { maybe } from "../../utils/maybe/maybe";

export const headersLazyLookup = (incomingHttpHeaders: IncomingHttpHeaders) => ({
    get(o, name) {
        return name == "asJSON"
            ? o.asJSON
            : maybe(incomingHttpHeaders[name]).map(h => h.toString());
    }
});
