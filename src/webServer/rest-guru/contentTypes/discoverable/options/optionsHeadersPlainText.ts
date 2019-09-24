import { optionsAcceptableTypes } from "./optionsAcceptableTypes";
import { acceptPreText } from "./acceptPreText";
import { bulletify } from "../../../../../utils/strings/bulletify";

export const optionsHeadersPlainText = `${acceptPreText}
${bulletify(optionsAcceptableTypes)}`;
