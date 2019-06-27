import { Mapper } from "../axioms/Mapper";
import { IMaybe } from "./IMaybe";
export type MaybeFlatmapper<T, S> = Mapper<T, IMaybe<S>>;
