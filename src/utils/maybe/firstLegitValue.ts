import * as _ from "lodash";
import { None } from "./None";
import { MaybeFlatmapper } from "./MaybeFlatmapper";
import { IMaybe } from "./IMaybe";

export const firstLegitValue = <T, S>(inputVal: T, ...ops: Array<MaybeFlatmapper<T, S>>): IMaybe<S> => {
    const opThatReturnedSomeValue = _.find(ops, op => op(inputVal).hasValue());
    return opThatReturnedSomeValue == undefined
        ? None
        : opThatReturnedSomeValue(inputVal);
};
