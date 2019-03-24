import { TypeSwitch, TypeMatch, TypeDefault, IsStringArray, IsStringDictionary } from "../utils/Switch";
import { theInternet } from "./theInternet";
import { Maybe, None, Some } from "./maybe";

export const getCompleteProjection = (url:string):Maybe<unknown> => {
    const maybeRepresentation = theInternet({url});
    return maybeRepresentation.hasValue
        ? Some(TypeSwitch<any, any, any>(maybeRepresentation.value,
            TypeMatch(IsStringArray, mapArrayToCompleteProjection),
            TypeMatch(IsStringDictionary, mapDictionaryToCompleteProject),
            TypeDefault(maybeRepresentation.value),
        ))        
        : None;
}

const mapArrayToCompleteProjection = arrayRepresentation => arrayRepresentation.map(i => getCompleteProjection(i).value)
const mapDictionaryToCompleteProject = dictionary => 
    Object
        .entries(dictionary)
        .map(([k,v]) => [getCompleteProjection(k).value as string, getCompleteProjection(v as string).value as string])
        .reduce((soFar, [k,v]) => ({...soFar, [k]: v}), {});