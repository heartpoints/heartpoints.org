import { EmptyList } from "./EmptyList";
import { IList } from "./IList";

export const ListOfLiterals = 
    <T>(...items: Array<T>): IList<T> => 
    items.reduce(
        (listSoFar, item) => listSoFar.push(item), 
        EmptyList as IList<T>
    );
