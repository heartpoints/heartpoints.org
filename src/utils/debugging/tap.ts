export const tap = (tappedFunction) => (...args) => {
    try {
        const returnVal = tappedFunction(...args)
        console.log({tappedFunction, args, returnVal})
        return returnVal
    }
    catch(error) {
        console.log({tappedFunction, args, error})
        throw error;
    }
}