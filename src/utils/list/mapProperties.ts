import { Dictionary } from "lodash";
import { Mapper } from "../axioms/Mapper";
import { identity } from "../axioms/identity";
import { mapDictionary } from "./mapDictionary";

export const mapProperties = <T, S>(obj: Dictionary<T>, valueMapper: Mapper<T, S>): Dictionary<S> => mapDictionary(obj, identity, valueMapper);
