import { Maybe } from "../utils/maybe";
import { Switch } from "../utils/Switch";

export const colors = ({url, contentType}):Maybe<string> => {
    return Switch()
        .cases(supportedColors, match => colorForContentType(contentType, match))
        .get(colorFromUrl(url))
}

const colorForContentType = (contentType, color) =>
    Switch()
        .caseLazy("text/html", () => colorHTMLString(color))
        .getOrDefault(contentType, color)

const colorHTMLString = (color) => `<html><body><h1>${color}</h1><p>${color} is a color</body></html>`

const supportedColors = [
    "green",
    "blue",
    "pink",
    "purple",
    "red",
]

const everythingAfterLastSlash = (stringg:string):string => stringg.substring(stringg.lastIndexOf("/") + 1)
const colorFromUrl = everythingAfterLastSlash