export const regexMatch = 
    (regex: string | RegExp) => 
    (actual:string) => 
    actual.match(regex) != null