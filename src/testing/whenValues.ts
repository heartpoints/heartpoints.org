import { objectAsKeyValueString } from "./objectAsKeyValueString";
import { whenSpacing } from "./whenSpacing";
export const whenValues = <T>(obj: T, block: (t: T) => void) => context(`when:\n${objectAsKeyValueString(obj)}\n${whenSpacing}...\n\n`, () => block(obj));
