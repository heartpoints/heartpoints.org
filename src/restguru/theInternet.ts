import { fields } from "./fields";
import { people } from "./people";
import { numbers } from "./numbers";
import { names } from "./names";
import { contentTypes } from "./contentTypes";
import { colors } from "./colors";
import { Maybe, firstMaybe, maybeValueForKey, maybe } from "../utils/maybe";
import { Dictionary } from "lodash";
import { HttpRequestArgs } from "./getCompleteProjection";

export const theInternet = ({url, contentType}:HttpRequestArgs):Maybe<RGson> => 
    maybe(contentType)
        .flatMap(_ =>firstMaybe(
            {url, contentType},
            oldInternet,
            colors,
        ))

export type Url = string
export type RGson = string | number | boolean | null | Url[] | Dictionary<Url>

export const basicResources:Dictionary<RGson> = {
    ...fields,
    ...people,
    ...names,
    ...numbers,
    ...contentTypes,
}

const oldInternet = ({url}):Maybe<RGson> => 
    maybeValueForKey(basicResources)(url)
    