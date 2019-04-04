import { fields } from "./fields";
import { people } from "./people";
import { numbers } from "./numbers";
import { names } from "./names";
import { contentTypes } from "./contentTypes";
import { colors } from "./colors";
import { Maybe, firstLegitValue, maybeValueForKey, maybe, maybeIf, maybeIfLazy, If } from "../utils/maybe";
import { Dictionary } from "lodash";
import { HttpRequestArgs, getCompleteProjection } from "./getCompleteProjection";
import { RGSONValue } from "./rgson";
import { JSONValue } from "./plainJson";

export const theInternet = ({url, contentType}:HttpRequestArgs):Maybe<RGSONValue> | Maybe<JSONValue> =>
    firstLegitValue(
        {url, contentType},
        projectionHandler,
        oldInternet,
        colors,
        fields,
        people,
    )

export type Url = string

const projectionHandler = ({url, contentType}) =>
    If(contentType == "http://rest.guru/rgson/completeProjection")
        .map(() => getCompleteProjection(theInternet({url, contentType: "http://rest.guru/rgson/primitive"}).value as RGSONValue))

export const basicResources:Dictionary<RGSONValue> = {
    ...names,
    ...numbers,
    ...contentTypes,
}

const oldInternet = ({url}:HttpRequestArgs):Maybe<RGSONValue> => 
    maybeValueForKey(basicResources)(url)
    