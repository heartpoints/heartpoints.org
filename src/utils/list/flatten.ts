import { EmptyList } from "./EmptyList";
import { IList } from "./IList";
export const flatten = <T>(listOfLists: IList<IList<T>>) => listOfLists.reduce((reducedSoFar, currentItemToReduce) => reducedSoFar.append(currentItemToReduce), EmptyList as IList<T>);
