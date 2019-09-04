type Log = <T>(...args:Array<T>) => T

export const log:Log = (...args) => {
    console.log(...args)
    return args[args.length - 1]
}
