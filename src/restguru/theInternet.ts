import { fields } from "./fields";
import { people } from "./people";
import { numbers } from "./numbers";
import { names } from "./names";
import { contentTypes } from "./contentTypes";
import { colors } from "./colors";
import { Maybe, firstMaybe, maybeValueForKey, maybe } from "../utils/maybe";
import { Dictionary } from "lodash";
import { HttpRequestArgs } from "./getCompleteProjection";
import { RGSONValue } from "./rgson";

export const theInternet = ({url, contentType}:HttpRequestArgs):Maybe<RGSONValue> => 
    maybe(contentType)
        .flatMap(_ =>firstMaybe(
            {url, contentType},
            oldInternet,
            colors,
        ))

export type Url = string

export const basicResources:Dictionary<RGSONValue> = {
    ...fields,
    ...people,
    ...names,
    ...numbers,
    ...contentTypes,
}

const oldInternet = ({url}:HttpRequestArgs):Maybe<RGSONValue> => 
    maybeValueForKey(basicResources)(url)
    