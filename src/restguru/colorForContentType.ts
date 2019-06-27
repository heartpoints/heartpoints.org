import { Switch } from "../utils/switch/Switch";
import { colorHTMLString } from "./colorHTMLString";
export const colorForContentType = (contentType, color) => Switch
    .when(contentType)
    .caseLazy("text/html", () => colorHTMLString(color))
    .result
    .valueOrDefault(color);
