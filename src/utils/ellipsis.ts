export const ellipsis = (text, maxChars) =>
    text.length > maxChars ? text.slice(0, maxChars - 3) + "..." : text;