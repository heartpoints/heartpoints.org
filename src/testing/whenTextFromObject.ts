import { objectAsKeyValueString } from "./objectAsKeyValueString"
import { whenSpacing } from "./whenSpacing"

export const whenTextFromObject = 
    (obj: Object) => 
    `when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`
