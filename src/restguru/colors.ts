import { Maybe } from "../utils/maybe/maybe";
import { Switch } from "../utils/switch/Switch";
import { colorForContentType } from "./colorForContentType";
import { supportedColors } from "./supportedColors";
import { colorFromUrl } from "./colorFromUrl";

export const colors = ({url, contentType}):Maybe<string> => {
    return Switch
        .when(colorFromUrl(url))
        .cases(supportedColors, match => colorForContentType(contentType, match))
        .result
}