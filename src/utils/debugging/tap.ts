import { log } from "./log"

export const tap = (tappedFunction) => (...args) => {
    try {
        const returnVal = tappedFunction(...args)
        log({tappedFunction, args, returnVal})
        return returnVal
    }
    catch(error) {
        log({tappedFunction, args, error})
        throw error
    }
}