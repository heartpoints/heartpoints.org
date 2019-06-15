import { memoize as lodashMemoize } from "lodash"

export const memoize = (f, ...args) => lodashMemoize(f, ...args)
