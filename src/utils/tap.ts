export const tap = (name, tappedFunction) => (...args) => {
    try {
        const returnVal = tappedFunction(...args)
        console.log({name, tappedFunction, args, returnVal})
        return returnVal
    }
    catch(error) {
        console.log({name, args, error})
        throw error;
    }
}