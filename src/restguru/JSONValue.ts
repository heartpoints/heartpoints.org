import { JSONLeaf } from "./JSONLeaf";
import { JSONSpreadable } from "./JSONSpreadable";

export type JSONValue = JSONLeaf | JSONSpreadable;
