export const log = (...args) => {
    console.log(...args)
    return args[args.length - 1]
}
