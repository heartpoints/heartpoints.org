import { newLine } from "../../utils/strings/newLine";
import { tab } from "../../utils/strings/tab";
export const tabForward = (textToTab: string) => textToTab.split(newLine).map(t => `${tab}${t}`).join(newLine);
