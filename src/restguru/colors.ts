import { IMaybe } from "../utils/maybe/IMaybe";
import { Switch } from "../utils/switch/Switch";
import { colorForContentType } from "./colorForContentType";
import { supportedColors } from "./supportedColors";
import { colorFromUrl } from "./colorFromUrl";

export const colors = ({url, contentType}):IMaybe<string> => {
    return Switch
        .when(colorFromUrl(url))
        .cases(supportedColors, match => colorForContentType(contentType, match))
        .result
}