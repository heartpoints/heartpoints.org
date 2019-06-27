import { ListOfLiterals } from "./ListOfLiterals";
import { IList } from "./IList";

export const List = <T>(array: Array<T>): IList<T> => ListOfLiterals(...array);
