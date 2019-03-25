import { Maybe } from "../utils/maybe";
import { Switch, Case, Default, CaseLazy } from "../utils/Switch";

export const colors = ({url, contentType}):Maybe<string> => {
    return Switch(
        colorFromUrl(url),
        ...supportedColors.map(c => Case(c, colorForContentType(contentType, c)))
    );
}

const colorForContentType = (contentType, color) =>
    Switch(contentType,
        CaseLazy("text/html", () => colorHTMLString(color)),
        Default(color),
    ).value

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