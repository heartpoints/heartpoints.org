import { newLine } from "./newLine";
export const bulletify = (arrayOfStrings:string[]) => arrayOfStrings.map(s => `- ${s}`).join(newLine);
