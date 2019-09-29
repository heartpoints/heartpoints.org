import { whenSpacing } from "./whenSpacing";

export const objectAsKeyValueString = (obj) => Object
    .entries(obj)
    .map(([k, v]) => `${whenSpacing}${k} = ${v}`)
    .join("\n");
