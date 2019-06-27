import { Maybe, maybe } from "../maybe/maybe";
import { Pair } from "../axioms/Pair";
import * as _ from "lodash"

export const zip = <T, S>(ts: Array<T>, ss: Array<S>): Maybe<Array<Pair<T, S>>> => {
    return maybe(_.zip(ts, ss) as Array<Pair<T, S>>);
};
