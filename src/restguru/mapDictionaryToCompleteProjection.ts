import { theInternet } from "./theInternet";
import { mapDictionary } from "../utils/list/mapDictionary";
import { RGSONDictionary } from "./rgson";
import { JSONObject } from "./JSONObject";
export const mapDictionaryToCompleteProjection = (dictionary: RGSONDictionary): JSONObject => mapDictionary(dictionary, k => theInternet({ url: k, contentType: "http://rest.guru/jsonHashKey" }).value!.toString(), v => theInternet({ url: v, contentType: "http://rest.guru/rgson/completeProjection" }).value);
