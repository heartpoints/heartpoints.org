import { responseAsOptionsPlainText } from "../contentTypes/discoverable/options/responseAsOptionsPlainText";
import { requestAcceptsOptionsContentType } from "../contentTypes/discoverable/options/requestAcceptsOptionsContentType";
import { getHeadersPlainText } from "./getHeadersPlainText";
import { contentTypesForRootResourceGetString } from "./contentTypesForRootResourceGetString";

export const responseText = req => requestAcceptsOptionsContentType(req)
    ? contentTypesForRootResourceGetString
    : responseAsOptionsPlainText(getHeadersPlainText);
