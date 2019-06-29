import { Dictionary } from "lodash";
import { Mapper } from "../axioms/Mapper";

export const mapDictionary = 
    <T, S>(obj: Dictionary<T>, keyMapper: Mapper<string, string>, valueMapper: Mapper<T, S>): {
        [k: string]: S;
    } => Object
    .entries(obj)
    .map(([k, v]) => ({ newKey: keyMapper(k), newValue: valueMapper(v) }))
    .reduce((soFar, { newKey, newValue }) => ({ ...soFar, [newKey]: newValue }), {});
