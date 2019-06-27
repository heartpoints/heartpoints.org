import { maybe } from "./maybe";
import { IMaybe } from "./IMaybe";
export const maybeValueForKey = <T>(obj: _.Dictionary<T>) => (key: string): IMaybe<T> => maybe(obj[key]);
