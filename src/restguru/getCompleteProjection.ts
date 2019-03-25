import { TypeSwitch, TypeMatch, TypeDefault, IsStringArray, IsStringDictionary } from "../utils/TypeSwitch";
import { theInternet } from "./theInternet";
import { Maybe } from "../utils/maybe";
import { mapDictionary } from "../utils/list";

export type HttpRequestArgs = {
    url:string,
    contentType:string,
}

export const getCompleteProjection = ({url, contentType}:HttpRequestArgs):Maybe<any> => {
    const maybeRepresentation = theInternet({url, contentType});
    return maybeRepresentation.flatMap(representation => TypeSwitch<any,any,any>(representation,
        TypeMatch(IsStringArray, mapArrayToCompleteProjection),
        TypeMatch(IsStringDictionary, mapDictionaryToCompleteProject),
        TypeDefault(representation),
    ));
}

const mapArrayToCompleteProjection = arrayRepresentation => 
    arrayRepresentation.map(
        url => getCompleteProjection({url, contentType: "sdfsdf" }).value
    )

const mapDictionaryToCompleteProject = dictionary => 
    mapDictionary(
        dictionary, 
        k => getCompleteProjection({url: k.toString(), contentType: "sdfasfsfd"}).value,
        v => getCompleteProjection({url: v.toString(), contentType: "asfdsfd"}).value,
    );