import * as _ from "lodash"
import { Url } from "./theInternet";

export type RGSONValue = string | number | boolean | null | RGSONDictionary | RGSONArray;

export interface RGSONDictionary {
    [x: string]: Url;
}

export const IsRJSONArray = (v:RGSONValue): v is RGSONArray => _.isArray(v)
export const IsRJSONDictionary = (v:RGSONValue): v is RGSONDictionary => _.isPlainObject(v)

export type RGSONArray = Array<Url>