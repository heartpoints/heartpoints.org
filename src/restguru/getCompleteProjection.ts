import { TypeSwitch, TypeMatch, TypeDefault } from "../utils/TypeSwitch";
import { theInternet } from "./theInternet";
import { Maybe } from "../utils/maybe";
import { mapDictionary } from "../utils/list";
import { RGSONValue, IsRJSONArray, IsRJSONDictionary } from "./rgson";

export type HttpRequestArgs = {
    url:string,
    contentType:string,
}

export const getCompleteProjection = ({url, contentType}:HttpRequestArgs):Maybe<JSONValue> => {
    const maybeRepresentation = theInternet({url, contentType});
    return maybeRepresentation.flatMap(representation => TypeSwitch<RGSONValue,any,JSONValue>(representation,
        TypeMatch(IsRJSONArray, mapArrayToCompleteProjection),
        TypeMatch(IsRJSONDictionary, mapDictionaryToCompleteProject),
        TypeDefault(representation),
    ));
}

const mapArrayToCompleteProjection = (arrayRepresentation:string[]):JSONValue[] => 
    arrayRepresentation.map(
        url => getCompleteProjection({url, contentType: "sdfsdf" }).value
    )

const mapDictionaryToCompleteProject = (dictionary:_.Dictionary<string>):_.Dictionary<JSONValue> => 
    mapDictionary(
        dictionary, 
        k => getCompleteProjection({url: k, contentType: "sdfasfsfd"}).value!.toString(),
        v => getCompleteProjection({url: v, contentType: "asfdsfd"}).value,
    );