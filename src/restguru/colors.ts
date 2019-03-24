import { Maybe, maybeIf } from "../utils/maybe";

export const colors = ({url}):Maybe => {
    const possibleMatchingColor = colorFromUrl(url)
    return maybeIf(supportedColors.includes(possibleMatchingColor), possibleMatchingColor);
}

const supportedColors = [
    "green",
    "blue",
    "pink",
    "purple",
    "red",
]

const everythingAfterLastSlash = (stringg:string):string => stringg.substring(stringg.lastIndexOf("/") + 1)
const colorFromUrl = everythingAfterLastSlash