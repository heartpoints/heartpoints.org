import fs from "fs"

export const fileForAbsolutePath = path => fs.createReadStream(path)
