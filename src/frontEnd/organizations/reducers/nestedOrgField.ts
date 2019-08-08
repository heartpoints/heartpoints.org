import { nestedFieldInArray } from "../../state/fields/nestedFieldInArray"
import { organizations } from "./organizations"

export const nestedOrgField = 
    (matchingHref: string) => 
    nestedFieldInArray(
        organizations,
        (o: any) => o.href == matchingHref
    )
