import { fields } from "./fields";
import { people } from "./people";
import { numbers } from "./numbers";
import { names } from "./names";
import { contentTypes } from "./contentTypes";
import { colors } from "./colors";
import { maybeValueForKey } from "../utils/maybe/maybeValueForKey";
import { firstLegitValue } from "../utils/maybe/firstLegitValue";
import { If } from "../utils/maybe/If";
import { IMaybe } from "../utils/maybe/IMaybe";
import { Dictionary } from "lodash";
import { getCompleteProjection } from "./getCompleteProjection";
import { HttpRequestArgs } from "./HttpRequestArgs";
import { RGSONValue } from "./rgson";
import { JSONValue } from "./JSONValue";

export const theInternet = ({url, contentType}:HttpRequestArgs):IMaybe<RGSONValue> | IMaybe<JSONValue> =>
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

const oldInternet = ({url}:HttpRequestArgs):IMaybe<RGSONValue> => 
    maybeValueForKey(basicResources)(url)
    