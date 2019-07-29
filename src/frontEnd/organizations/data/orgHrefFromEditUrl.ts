export const orgHrefFromEditUrl = 
    (path:string) => {
        const slashEditLocation = path.indexOf("/edit")
        return slashEditLocation == -1
            ? path
            : path.substring(0, slashEditLocation)
    }
    
