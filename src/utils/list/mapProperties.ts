import { Dictionary } from "lodash";
import { Mapper } from "../axioms/Mapper";
import * as _ from "lodash"

export const mapProperties = 
    <T, S>(obj:Dictionary<T>, mapper:Mapper<T, S>):Dictionary<S> =>
    _.mapValues(obj, mapper)