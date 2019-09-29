import { acceptPreText } from "../contentTypes/discoverable/options/acceptPreText";
import { bulletify } from "../../../utils/strings/bulletify";
import { contentTypesForRootResourceGet } from "./contentTypesForRootResourceGet";

export const getHeadersPlainText = `${acceptPreText}
${bulletify(contentTypesForRootResourceGet)}`;
