import { TypeSwitch, TypeMatch, TypeDefault, IsStringArray, IsStringDictionary } from "../utils/TypeSwitch";
import { theInternet } from "./theInternet";
import { Maybe } from "../utils/maybe";
import { mapDictionary } from "../utils/list";

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
    mapDictionary(
        dictionary, 
        k => getCompleteProjection(k.toString()).value,
        v => getCompleteProjection(v as string).value,
    );