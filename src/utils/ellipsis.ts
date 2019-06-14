export const ellipsis = 
    (text = "", maxChars = Infinity) =>
    text.length > maxChars 
        ? text.slice(0, maxChars - 3) + "..." 
        : text