import { TypeSwitch, TypeMatch, TypeDefault, IsStringArray, IsStringDictionary } from "../utils/TypeSwitch";
import { theInternet } from "./theInternet";
import { Maybe } from "./maybe";

export const getCompleteProjection = (url:string):Maybe<any> => {
    const maybeRepresentation = theInternet({url});
    return maybeRepresentation.flatMap(representation => TypeSwitch<any,any,any>(representation,
        TypeMatch(IsStringArray, mapArrayToCompleteProjection),
        TypeMatch(IsStringDictionary, mapDictionaryToCompleteProject),
        TypeDefault(representation),
    ));
}

const mapArrayToCompleteProjection = arrayRepresentation => arrayRepresentation.map(i => getCompleteProjection(i).value)
const mapDictionaryToCompleteProject = dictionary => 
    Object
        .entries(dictionary)
        .map(([k,v]) => [getCompleteProjection(k).value as string, getCompleteProjection(v as string).value as string])
        .reduce((soFar, [k,v]) => ({...soFar, [k]: v}), {});