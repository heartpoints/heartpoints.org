import * as _ from "lodash";
import { Maybe, Some, None } from "./maybe";
import { TypePredicate } from "./predicate";
import { Constant } from "./constant";

//todo: is there not a less imperative way to typesafely express this?
export const TypeSwitch = <GeneralType, SubType extends GeneralType, ResultType>(condition:GeneralType, ...typeCases:Array<TypeCase<GeneralType, SubType, ResultType>>):Maybe<ResultType> => {
    for(const typeCase of typeCases) {
        if(typeCase.matches(condition)) {
            return Some(typeCase.resolve(condition));
        }
    }
    return None
}

export type TypeCase<GeneralType, SubType extends GeneralType, ResultType> = {
    matches:TypePredicate<GeneralType, SubType>,
    resolve:(o:SubType) => ResultType,
}

export const TypeMatch = <T1, T2 extends T1, S>(typePredicate:(t1:T1) => t1 is T2, mapToResult:(t2:T2) => S) => ({
    matches: typePredicate,
    resolve: (t2:T2) => mapToResult(t2)
})

export const TypeDefault = <T1, T2, S>(result:S) => ({
    matches: TrueType,
    resolve: Constant(result),
})

export const TrueType = <T1, T2 extends T1>(t1:T1):t1 is T2 => true;