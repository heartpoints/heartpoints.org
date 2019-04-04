import { theInternet } from "./theInternet";
import { mapDictionary } from "../utils/list";
import { RGSONValue, IsRJSONArray, IsRJSONDictionary, RGSONDictionary, RGSONArray } from "./rgson";
import { JSONValue, JSONArray, JSONObject } from "./plainJson";
import { Switch } from "../utils/Switch";

export type HttpRequestArgs = {
    url:string,
    contentType:string,
}

export const getCompleteProjection = (rgson:RGSONValue):JSONValue => 
    Switch.that
        .matchesType(IsRJSONArray, mapArrayToCompleteProjection)
        .matchesType(IsRJSONDictionary, mapDictionaryToCompleteProject)
        .resultWhen(rgson)
        .valueOrDefault(rgson)

const mapArrayToCompleteProjection = (arrayRepresentation:RGSONArray):JSONArray => 
    arrayRepresentation.map(url => theInternet({url, contentType: "http://rest.guru/rgson/completeProjection"}).value)

const mapDictionaryToCompleteProject = (dictionary:RGSONDictionary):JSONObject => 
    mapDictionary(
        dictionary, 
        k => theInternet({url: k, contentType: "http://rest.guru/jsonHashKey"}).value!.toString(),
        v => theInternet({url: v, contentType: "http://rest.guru/rgson/completeProjection"}).value,
    );