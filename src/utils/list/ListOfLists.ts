import { ListOfLiterals } from "./ListOfLiterals";
import { IList } from "./IList";
export const ListOfLists = <T>(arrayOfArrays: Array<Array<T>>): IList<IList<T>> => ListOfLiterals(...arrayOfArrays).map(nestedArray => ListOfLiterals(...nestedArray));
