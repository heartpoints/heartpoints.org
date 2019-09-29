import { RGSONValue, IsRJSONArray, IsRJSONDictionary } from "./rgson";
import { JSONValue } from "../utils/json/JSONValue";
import { Switch } from "../utils/switch/Switch";
import { mapArrayToCompleteProjection } from "./mapArrayToCompleteProjection";
import { mapDictionaryToCompleteProjection } from "./mapDictionaryToCompleteProjection";

export const getCompleteProjection = (rgson:RGSONValue):JSONValue => 
    Switch.that
        .matchesType(IsRJSONArray, mapArrayToCompleteProjection)
        .matchesType(IsRJSONDictionary, mapDictionaryToCompleteProjection)
        .resultWhen(rgson)
        .valueOrDefault(rgson)