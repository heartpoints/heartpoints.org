import { MaybeFlatmapper } from "./MaybeFlatmapper";
import { Some } from "./Some";
import { IMaybe } from "./IMaybe";

export const reduceMaybe = 
    <T>(inputVal: T, ...ops: Array<MaybeFlatmapper<T, T>>): IMaybe<T> => 
    ops.reduce(
        (acc, current) => acc.flatMap(current), 
        Some(inputVal) as IMaybe<T>
    )
